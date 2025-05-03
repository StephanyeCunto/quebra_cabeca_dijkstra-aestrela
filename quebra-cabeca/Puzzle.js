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
                const aux = createFrame[this.positionZero()[1]][newZero[i][j]];
                createFrame[this.positionZero()[0]][newZero[i][j]]=0;
                createFrame[zero[0]][zero[1]]=aux;
                possibleFrame.push(createFrame);
            }
        }

        possibleFrame.forEach((frame, index) => {
            console.log(`\nFrame ${index + 1}:\n`);
            console.log(frame.map(row => row.join(' ')).join('\n'));
        });
        
        //for(const i=0; i<this.newZero.length; i++){
      /*  console.log(this.puzzle.map(row=>row.join(' ')).join('\n'));
            const aux = this.puzzle[newZero[0][0]][zero[1]];
            this.puzzle[newZero[0][0]][zero[1]]=0;
            this.puzzle[zero[0]][zero[1]]=aux;
        console.log();
        console.log(this.puzzle.map(row=> row.join(' ')).join('\n'));
        //}

       /* for(let i=0; i<this.puzzle.length; i++){
            for(let j=0; j<this.puzzle[i].length; j++){
                if(this.puzzle[i][j]===0){
                    console.log(newZero[0][0]);
                    console.log(this.puzzle.map(row => row.join(' ')).join('\n'));
                    let aux= this.puzzle[newZero[0][0]][j];
                    this.puzzle[newZero[0][0]][j]=0;
                    this.puzzle[i][j]=aux;
                    console.log();
                    console.log(this.puzzle.map(row => row.join(' ')).join('\n'));
                }
            }
        }*/
    }

    checkPosition(number){
        return number>=0 && number<this.puzzle.length;
    }
}