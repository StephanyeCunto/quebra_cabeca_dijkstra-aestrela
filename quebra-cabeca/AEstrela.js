export class AEstrela {
    constructor(puzzle) {
        this.puzzle = puzzle;
        this.quebraCabeca = puzzle.getQuebraCabeca();
        this.movimentos = puzzle.getMovimentos();
        this.solucao = puzzle.getSolucao();

        this.heuristicaTabuleiros = new Map();
        this.solucoes = new Map();

        this.selecionarCaminho(puzzle);

        

     //   console.log(this.heuristicaTabuleiros);
     /*   for (let i = 0; i < this.tabuleirosPossiveis.length; i++) {
            const tabuleiro = this.tabuleirosPossiveis[i];
            const heuristica = this.calcularHeuristica(tabuleiro);
            this.heuristicaTabuleiros.set(tabuleiro, heuristica);
            if (this.estaResolvido(tabuleiro)) this.adicionarSolucao(tabuleiro, heuristica);
        }
*/
     //   this.gerarCaminho();
    }

    selecionarCaminho(puzzle){
        console.log(puzzle)

    this.tabuleirosPossiveis = puzzle.getTabuleirosPossiveis(puzzle.getQuebraCabeca());
        console.log("Tabuleiros possiveis agr: "+ this.tabuleirosPossiveis)
        let menorCusto = Number.MAX_VALUE;
        for(let tabuleiro of this.tabuleirosPossiveis){
            const heuristica = this.calcularHeuristica(tabuleiro);
            this.imprimirTabuleiro(tabuleiro)
            console.log("Heuristica: "+ heuristica)
            this.heuristicaTabuleiros.set(tabuleiro, heuristica);
            //if (this.estaResolvido(tabuleiro)) this.adicionarSolucao(tabuleiro, heuristica);
            if (this.estaResolvido(tabuleiro)) {
                this.adicionarSolucao(tabuleiro, heuristica);
                return; 
        }
          if (heuristica < menorCusto) {
    menorCusto = heuristica;
    const copia = tabuleiro.map(linha => [...linha]);
    puzzle.setQuebraCabeca(copia);
    this.quebraCabeca = copia; // <--- mantém em sincronia
}

        }
        console.log(menorCusto);
        puzzle.setMovimentos(puzzle.getMovimentos()+1);
        console.log(puzzle)
       this.selecionarCaminho(puzzle);
    }

    imprimirTabuleiro(tabuleiro) {
    const tamanho = tabuleiro.length;
    const larguraCelula = tabuleiro[0].length; 
    const linhaHorizontal = "+" + ("-".repeat(larguraCelula) + "+").repeat(tamanho);
    console.log(linhaHorizontal);

        for (let i = 0; i < tamanho; i++) {
            let linha = "|";
            for (let j = 0; j < tamanho; j++) {
                let valor = tabuleiro[i][j] === 0 ? " " : tabuleiro[i][j].toString();
                linha += valor.padStart(larguraCelula, " ") + "|";
            }
            console.log(linha);
            console.log(linhaHorizontal);
        }
    }

    calcularHeuristica(tabuleiro) {
        let distancia = 0;
        for (let i = 0; i < tabuleiro.length; i++) for (let j = 0; j < tabuleiro[i].length; j++) {
            let valor = tabuleiro[i][j];
            distancia += Math.abs(this.solucao.get(valor).x - i) + Math.abs(this.solucao.get(valor).y - j);
        }
        return distancia;
    }

       estaResolvido(tabuleiro) {
        for (let i = 0; i < tabuleiro.length; i++) {
            for (let j = 0; j < tabuleiro[i].length; j++) {
                const valor = tabuleiro[i][j];
                if (this.solucao.get(valor).x !== i || this.solucao.get(valor).y !== j) {
                    return false;
                }
            }
        }
        return true;
    }

    adicionarSolucao(tabuleiro, heuristica) {
        this.solucoes.set(tabuleiro, heuristica);
        this.heuristicaTabuleiros.delete(tabuleiro);
    }
}

   /* gerarCaminho() {
        const menorCusto = this.encontrarMenorCusto();
        const valorMenorCusto = menorCusto[0];
        const tabuleiroMenorCusto = menorCusto[1];

       console.log("Menor Custo:", valorMenorCusto, " Tabuleiro:");
        console.log(tabuleiroMenorCusto.map(linha => linha.join(' ')).join('\n'));

        const novosTabuleiros = this.objetoPuzzle.getTabuleirosPossiveis(tabuleiroMenorCusto);
        for (let i = 0; i < novosTabuleiros.length; i++) {
            const heuristicaTotal = this.calcularHeuristica(novosTabuleiros[i]) + valorMenorCusto;
            this.heuristicaTabuleiros.set(novosTabuleiros[i], heuristicaTotal);
        }

        this.heuristicaTabuleiros.forEach((valor, tabuleiro) => {
            console.log("Heurística:", valor);
            console.log("Tabuleiro:");
            console.log(tabuleiro.map(linha => linha.join(' ')).join('\n'));
            console.log('------------------------');
        });
    }

    encontrarMenorCusto() {
        let menorCusto = Infinity;
        let tabuleiroMenorCusto;
        this.heuristicaTabuleiros.forEach((valor, tabuleiro) => {
            if (valor < menorCusto) {
                menorCusto = valor;
                tabuleiroMenorCusto = tabuleiro;
            }
        });
        return [menorCusto, tabuleiroMenorCusto];
    }

    calcularHeuristica(tabuleiro) {
        let distancia = 0;
        for (let i = 0; i < tabuleiro.length; i++) {
            for (let j = 0; j < tabuleiro[i].length; j++) {
                let valor = tabuleiro[i][j];
                distancia += Math.abs(this.solucao.get(valor).x - i) + Math.abs(this.solucao.get(valor).y - j);
            }
        }
        return distancia;
    }

    estaResolvido(tabuleiro) {
        for (let i = 0; i < tabuleiro.length; i++) {
            for (let j = 0; j < tabuleiro[i].length; j++) {
                const valor = tabuleiro[i][j];
                if (this.solucao.get(valor).x !== i || this.solucao.get(valor).y !== j) {
                    return false;
                }
            }
        }
        return true;
    }

    adicionarSolucao(tabuleiro, heuristica) {
        this.solucoes.set(tabuleiro, heuristica);
        this.heuristicaTabuleiros.delete(tabuleiro);
    }
}*/
    
    /*
    aEstrela(puzzle) {
        const startState = this.createPuzzle(puzzle.getPuzzle());
        const visited = new Set();
        const pq = new PriorityQueue();

        pq.enqueue(puzzle.getPuzzle(), this.getHeuristic(puzzle.getPuzzle()));
        visited.add(startState.id);

        while (!pq.isEmpty()) {
            const current = pq.dequeue();

            if (this.isSolved(current.quebraCabeca)) {
                console.log(`✅ Solução encontrada em ${current.movimentos} movimentos.\n`);
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

        console.log("❌ Nenhuma solução encontrada.");
        return -1;
    }

    createPuzzle(board, movimentos = 0, caminho = []) {
        const id = board.flat().join('');
        return {
            quebraCabeca: board,
            id,
            movimentos,
            caminho: [...caminho, board]
        };
    }

    isSolved(board) {
        const goal = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 0]
        ];
        return board.flat().join('') === goal.flat().join('');
    }

    getProximoEstado(state) {
        const puzzle = new Puzzle(state.quebraCabeca); // Usa sua classe Puzzle
        const estados = [];

        puzzle.possibleBoard.forEach(board => {
            const newState = this.createPuzzle(board, state.movimentos + 1, state.caminho);
            estados.push(newState);
        });

        return estados;
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
                const [goalX, goalY] = goalPositions[value];
                distance += Math.abs(i - goalX) + Math.abs(j - goalY);
            }
        }
        return distance;
    }

    printSolution(caminho) {
        caminho.forEach((step, index) => {
            console.log(`Passo ${index}:`);
            console.log(step.map(row => row.join(' ')).join('\n'));
            console.log('\n');
        });
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
 } */