export class AEstrela {
    constructor(puzzle) {
        this.puzzle = puzzle;
        this.quebraCabeca = puzzle.getQuebraCabeca();
        this.movimentos = 0; 
        this.solucao = puzzle.getSolucao();
        this.caminhoSolucao = [];

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
                this.caminhoSolucao = estadoAtual.caminho; 
                this.imprimirCaminho(); 
                return estadoAtual.caminho; 
            }
            
            this.puzzle.setQuebraCabeca(estadoAtual.tabuleiro);
            const tabuleirosPossiveis = this.puzzle.getTabuleirosPossiveis(estadoAtual.tabuleiro);
            
            for (let tabuleiro of tabuleirosPossiveis) {
                const tabuleiroStr = JSON.stringify(tabuleiro);
                const novosMovimentos = estadoAtual.movimentos + 1;
                
                if (!this.visitado.has(tabuleiroStr) || this.visitado.get(tabuleiroStr) > novosMovimentos) {
                    this.gerarNovoEstado(filaAberta, tabuleiro, novosMovimentos, estadoAtual.caminho);
                }
            }
        }
        
        console.log("Sem solução encontrada");
        return null;
    }

    gerarNovoEstado(filaAberta, tabuleiro, novosMovimentos, caminhoAnterior) {
        const heuristica = this.calcularHeuristica(tabuleiro);
        const custoF = novosMovimentos + heuristica;
        
        const novoCaminho = [...caminhoAnterior, tabuleiro];
        
        const novoEstado = { 
            tabuleiro: tabuleiro, 
            movimentos: novosMovimentos, 
            custoF: custoF,
            caminho: novoCaminho
        };
        
        filaAberta.enqueue(novoEstado, custoF);
    }

    iniciarFila() {
        const filaAberta = new PriorityQueue();
        const tabuleiroInicial = this.puzzle.getQuebraCabeca();
        const estadoInicial = { 
            tabuleiro: tabuleiroInicial,
            movimentos: 0, 
            custoF: this.calcularHeuristica(tabuleiroInicial),
            caminho: [tabuleiroInicial] 
        };
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

    getCaminhoSolucao() {
        return this.caminhoSolucao;
    }

    imprimirCaminho() {
        if (this.caminhoSolucao.length === 0) {
            console.log("Nenhum caminho encontrado");
            return;
        }

        console.log("\n=== CAMINHO DA SOLUÇÃO ===");
        this.caminhoSolucao.forEach((tabuleiro, index) => {
            console.log(`\nPasso ${index}:`);
            this.imprimirTabuleiro(tabuleiro);
        });
    }

    imprimirTabuleiro(tabuleiro) {
        const tamanho = tabuleiro.length;
        const larguraCelula = Math.max(...tabuleiro.flat()).toString().length + 1;
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