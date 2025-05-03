# Solucionador de Quebra-Cabeça Deslizante

Este projeto implementa um solucionador para o clássico quebra-cabeça deslizante 3x3 (também conhecido como quebra-cabeça de 8) usando dois algoritmos diferentes: o algoritmo de Dijkstra e a busca A*. O solucionador é implementado em JavaScript e pode ser executado em um ambiente Node.js.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Detalhes dos Algoritmos](#detalhes-dos-algoritmos)
- [Comparação de Desempenho](#comparação-de-desempenho)

## Visão Geral

O quebra-cabeça deslizante é um jogo popular onde você tem uma grade com peças numeradas e um espaço vazio. O objetivo é deslizar as peças para organizá-las em uma ordem específica (geralmente em ordem numérica) usando o espaço vazio.

Este solucionador recebe um estado inicial do quebra-cabeça e encontra a solução ótima para alcançar o estado objetivo:

```
1 2 3
4 5 6
7 8 0
```

Onde `0` representa o espaço vazio.

## Funcionalidades

- Resolve quebra-cabeças deslizantes 3x3 usando dois algoritmos:
  - Algoritmo de Dijkstra
  - Busca A*
- Imprime a solução passo a passo
- Mede e compara o tempo de execução de ambos os algoritmos

## Requisitos

- Node.js (versão 12.0 ou superior recomendada)

## Detalhes dos Algoritmos

### Algoritmo de Dijkstra

O algoritmo de Dijkstra é usado aqui para encontrar o caminho mais curto do estado inicial ao estado objetivo. Ele explora todos os movimentos possíveis, mantendo o controle do número de movimentos realizados, e garante encontrar a solução ótima.

### Busca A*

A busca A* é um algoritmo de busca informada que usa uma função heurística para guiar a busca em direção ao estado objetivo. Nesta implementação, a heurística da distância de Manhattan é usada para estimar a distância do estado atual até o estado objetivo.

## Comparação de Desempenho

O script inclui medições de tempo para ambos os algoritmos. Geralmente, espera-se que a busca A* seja mais rápida que o algoritmo de Dijkstra para este problema, especialmente para estados iniciais mais complexos, devido ao uso da função heurística para guiar a busca.
