export class Puzzle {
    constructor(puzzle) {
        this.puzzle = puzzle;
        this.solucao = this.solucaoTabuleiro();
        this.movimentos = 0;
        this.tabuleirosPossiveis = [];
       // this.imprimirQuebraCabeca();
    }

    solucaoTabuleiro() {
        let k = 1;
        let solucao = new Map();
        for (let i = 0; i < this.puzzle.length; i++) for (let j = 0; j < this.puzzle[i].length; j++) 
            (i == this.puzzle.length-1 && j == this.puzzle[i].length-1) ? solucao.set(0, { 'x': i, 'y': j }) : solucao.set(k++, { 'x': i, 'y': j });
        return solucao;
    }

    posicaoZero() {
        for (let i = 0; i < this.puzzle.length; i++) for (let j = 0; j < this.puzzle[i].length; j++) if (this.puzzle[i][j] === 0) return [i, j];
    }

    proximoEstado() {
        const zero = this.posicaoZero();
        let novoZero = [];       

        for(let i = 0; i < 2; i ++){
            if(this.checarPosicao(zero[i] - 1)){ 
                if(i == 0) novoZero.push([zero[i] - 1, zero[1]]);
                if(i == 1) novoZero.push([zero[0] , zero[i] - 1]);
            }
            if(this.checarPosicao(zero[i] + 1)){
                if(i == 0) novoZero.push([zero[i] + 1, zero[1]]);
                if(i == 1) novoZero.push([zero[0] , zero[i] + 1]);
            }         
        }
       this.gerarTabuleiros(novoZero, zero);
    }

    gerarTabuleiros(novoZero, zero){
        for(let i = 0; i < novoZero.length; i++){
            let puzzleNew =  this.puzzle.map(row => [...row]);
            for(let j = 0 ; j < this.puzzle.length; j++) for(let k = 0; k < this.puzzle[j].length; k ++){
                if(j == novoZero[i][0] && k == novoZero[i][1]) puzzleNew[j][k] = 0;
                else if(j == zero[0] && k == zero[1]) puzzleNew[j][k] = this.puzzle[novoZero[i][0]][novoZero[i][1]];
            } 
            this.tabuleirosPossiveis.push(puzzleNew);
        }
    }

    checarPosicao(numero) {
        return numero >= 0 && numero < this.puzzle.length;
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

    imprimirQuebraCabeca() {
      //  console.log("Solução:");
       // console.log(this.solucao);
       // console.log("\n");
        console.log("Estado atual:");
        console.log(this.puzzle.map(linha => linha.join(' ')).join('\n'));
        console.log("\n");
        console.log("Possíveis estados:");
        this.tabuleirosPossiveis.forEach((tabuleiro, indice) => {
            console.log(`Estado ${indice + 1}:`);
            console.log(tabuleiro.map(linha => linha.join(' ')).join('\n'));
            console.log("\n");
        });
    }

    getQuebraCabeca() {
        return this.puzzle;
    }

    setQuebraCabeca(puzzle) {
        this.puzzle = puzzle;
    }

    getMovimentos() {
        return this.movimentos;
    }

    setMovimentos(movimentos) {
        this.movimentos = movimentos;
    }

    getTabuleirosPossiveis(puzzle) {
        this.puzzle = puzzle;
        this.tabuleirosPossiveis = [];
        this.proximoEstado();
        return this.tabuleirosPossiveis;
    }

    getSolucao() {
        return this.solucao;
    }
}
