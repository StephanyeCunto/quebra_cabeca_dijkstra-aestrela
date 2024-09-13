class QuebraCabecaSolucao {
    constructor(quebraCabeca) {
        this.quebraCabeca = quebraCabeca;
        this.quebraCabecaSolucao = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 0]
        ];
        this.posicaoInicial = this.posicaoZero(this.quebraCabeca);
    }

    posicaoZero(quebraCabeca) {
        for (let i = 0; i < quebraCabeca.length; i++) {
            for (let j = 0; j < quebraCabeca[i].length; j++) {
                if (quebraCabeca[i][j] === 0) {
                    return [i, j];
                }
            }
        }
    }

    createPuzzle(quebraCabeca, posicaoZero, movimentos = 0, caminho = []) {
        return {
            quebraCabeca,
            posicaoZero,
            movimentos,
            id: quebraCabeca.flat().join(''),
            caminho: [...caminho, quebraCabeca]
        };
    }

    getProximoEstado(peca) {
        const [x, y] = peca.posicaoZero; 
        const directions = [
            [-1, 0], 
            [1, 0],  
            [0, -1], 
            [0, 1],  
        ];
        const neighbors = [];

        directions.forEach(([dx, dy]) => {
            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < 3 && newY >= 0 && newY < 3) {
                const newBoard = peca.quebraCabeca.map(row => row.slice());
                [newBoard[x][y], newBoard[newX][newY]] = [newBoard[newX][newY], newBoard[x][y]];
                neighbors.push(this.createPuzzle(newBoard, [newX, newY], peca.movimentos + 1, peca.caminho));
            }
        });

        return neighbors;
    }

    isSolved(quebraCabeca) {
        return quebraCabeca.flat().join('') === this.quebraCabecaSolucao.flat().join('');
    }

    printSolution(caminho) {
        caminho.forEach((board, index) => {
            console.log(`Estado ${index + 1}:`);
            board.forEach(row => console.log(row.join(' ')));
            console.log('');
        });
    }

    dijkstra() {
        const startState = this.createPuzzle(this.quebraCabeca, this.posicaoInicial);
        const visited = new Set();
        const pq = new PriorityQueue();

        pq.enqueue(startState, 0);
        visited.add(startState.id);

        while (!pq.isEmpty()) {
            const current = pq.dequeue();

            if (this.isSolved(current.quebraCabeca)) {
                console.log(`Solução encontrada em ${current.movimentos} movimentos.\n`);
                this.printSolution(current.caminho);
                return current.movimentos;
            }

            this.getProximoEstado(current).forEach(nextState => {
                if (!visited.has(nextState.id)) {
                    visited.add(nextState.id);
                    pq.enqueue(nextState, nextState.movimentos);
                }
            });
        }

        return -1;
    }

    aEstrela() {
        const startState = this.createPuzzle(this.quebraCabeca, this.posicaoInicial);
        const visited = new Set();
        const pq = new PriorityQueue();

        pq.enqueue(startState, this.getHeuristic(startState.quebraCabeca));
        visited.add(startState.id);

        while (!pq.isEmpty()) {
            const current = pq.dequeue();

            if (this.isSolved(current.quebraCabeca)) {
                console.log(`Solução encontrada em ${current.movimentos} movimentos.\n`);
                this.printSolution(current.caminho);
                return current.movimentos;
            }

            this.getProximoEstado(current).forEach(nextState => {
                if (!visited.has(nextState.id)) {
                    visited.add(nextState.id);
                    const priority = nextState.movimentos + this.getHeuristic(nextState.quebraCabeca);
                    pq.enqueue(nextState, priority);
                }
            });
        }

        return -1;
    }

    getHeuristic(board) {
        let distance = 0;
        const goalPositions = {
            1: [0, 0], 2: [0, 1], 3: [0, 2],
            4: [1, 0], 5: [1, 1], 6: [1, 2],
            7: [2, 0], 8: [2, 1], 0: [2, 2]
        };

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const value = board[i][j];
                if (value !== 0) {
                    const [goalX, goalY] = goalPositions[value];
                    distance += Math.abs(i - goalX) + Math.abs(j - goalY);
                }
            }
        }
        return distance;
    }
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(puzzle, priority) {
        this.queue.push({ puzzle, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.queue.shift().puzzle;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

const quebraCabeca = [
    [1, 2, 3],
    [4, 0, 5],
    [7, 8, 6]
];

const solucao = new QuebraCabecaSolucao(quebraCabeca);

console.log("Resolvendo com Dijkstra:");
console.time("Dijkstra");
solucao.dijkstra();
console.timeEnd("Dijkstra");

console.log("Resolvendo com A*:");
console.time("A*");
solucao.aEstrela();
console.timeEnd("A*");