export class Puzzle{
    constructor(puzzle){
        this.puzzle=puzzle;
        this.solution;
        this.moviments=0;
        this.possibleBoard=[];
        this.nextState();
        this.boardSolution();
        this.printPuzzle();
    }

    boardSolution(){
        let k=1;
        this.solution= new Map();
        for(let i=0; i<this.puzzle.length; i++){
            for(let j=0; j<this.puzzle[i].length;j++){
                (i == this.puzzle.length-1 && j == this.puzzle[i].length-1) ? this.solution.set(0,{'x':i,'y':j}): this.solution.set(k,{'x':i,'y':j});
                k++;
            }
        }
    }

    positionZero(){
        for(let i=0; i<this.puzzle.length; i++){
            for(let j=0; j<this.puzzle[i].length; j++){
                if(this.puzzle[i][j]===0)return [i,j];
            }
        }
    }

    nextState(){
        const zero=this.positionZero();
        let newZero =[];
        for(let i=0; i<2; i++){
            let row= [];
            if(this.checkPosition(zero[i%2]-1))row.push(zero[i%2]-1);
            if(this.checkPosition(zero[i%2]+1))row.push(zero[i%2]+1);

            newZero.push(row);
        }

        this.generateBoards(newZero,zero);
    }

    generateBoards(newZero,zero){
        this.possibleBoard.length = 0;
        for(let i=0; i<newZero.length; i++){
            for(let j=0; j< newZero[i].length;j++){
                let createBoard = this.puzzle.map(row => row.slice());
                let x,y;
                if(i === 0){
                    x = newZero[i][j];
                    y = zero[1];
                }else{
                    x = zero[0];
                    y = newZero[i][j];
                }
                createBoard[zero[0]][zero[1]]=createBoard[x][y];
                createBoard[x][y]=0;

                this.possibleBoard.push(createBoard);
            }
        }
    }

    checkPosition(number){
        return number>=0 && number<this.puzzle.length;
    }

    printPuzzle(){
        console.log("Solucao:");
        console.log(this.solution);
        console.log("\n");
        console.log("Estado atual:");
        console.log(this.puzzle.map(row => row.join(' ')).join('\n'));
        console.log("\n");
        console.log("Possiveis estados:");
        this.possibleBoard.forEach((board, index) => {
            console.log(`Estado ${index + 1}:`);
            console.log(board.map(row => row.join(' ')).join('\n'));
            console.log("\n");
        });
    }

    getPuzzle(){
        return this.puzzle;
    }

    setPuzzle(puzzle){
        this.puzzle=puzzle;
    }

    getMoviments(){
        return this.moviments;
    }

    setMoviments(moviments){
        this.moviments=moviments;
    }

    getPossibleBoard(puzzle){
        this.puzzle = puzzle;
        this.nextState();
        return this.possibleBoard;
    }

    getSolution(){
        return this.solution;
    }


}