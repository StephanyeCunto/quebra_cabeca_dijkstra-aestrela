export class AEstrela {
    constructor(puzzle) {
        this.puzzleObject = puzzle;
        this.puzzle = puzzle.getPuzzle();
        this.moviments = puzzle.getMoviments();
        this.solution = puzzle.getSolution();
        this.possibleBoard = puzzle.getPossibleBoard(this.puzzle);

        this.heuristcPossibleBoard;
        this.heuristcPossibleBoard = new Map();

        this.solutions;
        this.solutions = new Map();

        for(let i=0; i<this.possibleBoard.length; i++){
            const board = this.possibleBoard[i];
            const heuristic=this.getHeuristic(board);
            this.heuristcPossibleBoard.set(board,heuristic);  
            if(this.isSolved(board)) this.addSolver(board,heuristic);
        }

       this.generatePath();
    }

    generatePath(){
        const minorCharge = this.minorCharge(); 
        const minorChargeValue = minorCharge[0]; 
        const minorChargeBoard = minorCharge[1];
        console.log("minorChargeValue: ",minorChargeValue," minorChargeBoard: ",minorChargeBoard);   

        const possibleBoard = this.puzzleObject.getPossibleBoard(minorChargeBoard);
        for(let i=0;i<possibleBoard.length; i++){
            this.heuristcPossibleBoard.set(possibleBoard[i], (this.getHeuristic(possibleBoard[i])+minorChargeValue));
        }

        console.log(this.heuristcPossibleBoard);
    }

    minorCharge(){
        let minorCharge = Infinity;
        let minorChargeBoard ;
        this.heuristcPossibleBoard.forEach((value,key)=>{
            if(value < minorCharge){
                minorCharge = value;
                minorChargeBoard = key;
            }
        })

        return [minorCharge,minorChargeBoard];
    }

    getHeuristic(puzzle){
        let distance = 0;
        for(let i=0; i<puzzle.length; i++){
            for(let j=0; j<puzzle[i].length; j++){
                let value = puzzle[i][j];
                distance+=Math.abs(this.solution.get(value).x - i) + Math.abs(this.solution.get(value).y - j);
            }
        }
        return distance;
    }

    isSolved(puzzle){
        for(let i=0; i<puzzle.length;i++){
            for(let j=0; j< puzzle[i].length; j++){
                const puzzleCheck = puzzle[i][j];                
                if(this.solution.get(puzzleCheck).x != i || this.solution.get(puzzleCheck).y != j){
                    return false;
                }
            }
        }
        return true;
    }

    addSolver(board,heuristic){
        this.solutions.set(board,heuristic);
        this.heuristcPossibleBoard.delete(board);
    }

}
    
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