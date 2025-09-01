export class AEstrela {
    constructor(puzzle) {
        this.puzzle =puzzle;
        this.quebraCabeca = puzzle.getQuebraCabeca();
        this.movimentos = 0; 
        this.solucao = puzzle.getSolucao();

        this.heuristicaTabuleiros = new Map();
        this.solucoes = new Map();
        this.visitado = new Map();

        this.selecionarCaminho();
    }

    selecionarCaminho() {
        const filaAberta = this.iniciarFila();
        
        while (!filaAberta.isEmpty()) {
            const estadoAtual = filaAberta.dequeue();
            const tabuleiroStr = JSON.stringify(estadoAtual.tabuleiro);
            
            if (this.visitado.has(tabuleiroStr) && this.visitado.get(tabuleiroStr) <= estadoAtual.movimentos) continue;
            this.visitado.set(tabuleiroStr, estadoAtual.movimentos);
            
            console.log({ tabuleiro: estadoAtual.tabuleiro, custo: estadoAtual.custoF, movimentos: estadoAtual.movimentos });
            
            if (this.puzzle.estaResolvido(estadoAtual.tabuleiro)) {
                console.log("Solução encontrada em", estadoAtual.movimentos, "movimentos");
                return;
            }
            
            this.puzzle.setQuebraCabeca(estadoAtual.tabuleiro);
            const tabuleirosPossiveis =this.puzzle.getTabuleirosPossiveis(estadoAtual.tabuleiro);
            
            for (let tabuleiro of tabuleirosPossiveis) {
                const tabuleiroStr = JSON.stringify(tabuleiro);
                const novosMovimentos = estadoAtual.movimentos + 1;
                
                if (!this.visitado.has(tabuleiroStr) || this.visitado.get(tabuleiroStr) > novosMovimentos)  this.gerarNovoEstado(filaAberta, tabuleiro, novosMovimentos);
            }
        }
        
        console.log("Sem solução encontrada");
    }

    gerarNovoEstado(filaAberta, tabuleiro, novosMovimentos){
        const heuristica = this.calcularHeuristica(tabuleiro);
        const custoF = novosMovimentos + heuristica;        
        const novoEstado = { tabuleiro: tabuleiro, movimentos: novosMovimentos, custoF: custoF };        
        filaAberta.enqueue(novoEstado, custoF);
    }

    iniciarFila(){
        const filaAberta = new PriorityQueue();
        const estadoInicial = { tabuleiro: this.puzzle.getQuebraCabeca(),movimentos: 0, custoF: this.calcularHeuristica(this.puzzle.getQuebraCabeca())};
        filaAberta.enqueue(estadoInicial, estadoInicial.custoF);
        return filaAberta;
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
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, priority) {
        this.queue.push({ item, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.queue.shift().item;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}