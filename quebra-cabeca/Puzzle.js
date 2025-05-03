export class Puzzle{
    constructor(puzzle){

        this.puzzle=puzzle;
        this.solution=[];

        this.frameSolution();
        this.moviments=0;
    }

    frameSolution(){
        let k=1;
        for(let i=0; i<this.puzzle.length; i++){
            this.solution[i] = [];
            for(let j=0; j<this.puzzle[i].length;j++){
                if(i == this.puzzle.length-1 && j == this.puzzle[i].length-1)this.solution[i][j]=0;
                else this.solution[i][j]=k;
                k++;
            }
        }
    }

    printPuzzle(){
        console.log("Solucao:");
        console.log(this.solution.map(row => row.join(' ')).join('\n'));
        console.log("\n");
        console.log("Estado atual:");
        console.log(this.puzzle.map(row => row.join(' ')).join('\n'));
        console.log("\n");
        console.log("Posicao do zero:");
        console.log(this.positionZero());
        this.nextState();
    }
    
    positionZero(){
        for(let i=0; i<this.puzzle.length; i++){
            for(let j=0; j<this.puzzle[i].length; j++){
                if(this.puzzle[i][j]===0){
                    return [i,j];
                }
            }
        }
    }

    nextState(){
        const zero=this.positionZero();
        let newZero =[];
        let j=0;
        for(let i=0; i<2; i++){
            let row= [];
            if(this.checkPosition(zero[i%2]-1)){
                row.push(zero[i%2]-1);
                j++;
            }
            if(this.checkPosition(zero[i%2]+1)){
                row.push(zero[i%2]+1);
                j++;
            }
            newZero.push(row);
        }
        console.log(newZero);

        this.newBoard(newZero);
    }

    newBoard(newZero){
        const possibleFrame= [];
        let zero = this.positionZero();

        for(let i=0; i<newZero.length; i++){
            for(let j=0; j< newZero[i].length;j++){
                    let createFrame = this.puzzle.map(row => row.slice());
                    let aux;
                    if(i==0){
                        aux = createFrame[newZero[i][j]][this.positionZero()[i]];
                        createFrame[newZero[i][j]][this.positionZero()[i]]=0;
                    }else{
                        aux = createFrame[this.positionZero()[i]][newZero[i][j]];
                        createFrame[this.positionZero()[i]][newZero[i][j]]=0;
                    }
                createFrame[zero[j]][zero[i]]=aux;
                possibleFrame.push(createFrame);
            }
        }

        possibleFrame.forEach((frame, index) => {
            console.log(`\nFrame ${index + 1}:\n`);
            console.log(frame.map(row => row.join(' ')).join('\n'));
        });

        return possibleFrame;
    }

    checkPosition(number){
        return number>=0 && number<this.puzzle.length;
    }
}