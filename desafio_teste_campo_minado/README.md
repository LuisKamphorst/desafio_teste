# Campo Minado

## Especificação

Tabuleiro de 18 colunas por 14 linhas com 40 bombas distintas. As coordenadas começam em zero. Cada número conta as bombas entre as oito casas vizinhas possíveis. Abrir uma casa vazia expande a região até as casas numeradas. Bandeiras bloqueiam a abertura. Uma bomba encerra a partida em derrota, inclusive na primeira jogada. Revelar todas as casas seguras dá a vitória.

## Execução

Com Node.js 18 ou superior, abra o terminal na pasta que contém este README e execute `npm test`. O projeto usa o executor de testes do Node.js e dispensa instalação de dependências. A implementação está em `jogo.js` e os cenários estão em `jogo.test.js`.

## Casos de teste

1. **Distribuição padrão** — Confere quantidade, faixa e unicidade das bombas sorteadas.
2. **Configuração inválida** — Tenta repetir uma posição, usar um índice inválido ou fornecer apenas 39 bombas.
3. **Limites do tabuleiro** — Aceita a última casa das 14 linhas e 18 colunas e rejeita coordenadas externas.
4. **Contagem nas bordas e diagonais** — Compara o número de vizinhas minadas com valores conhecidos no canto, na borda e na diagonal.
5. **Abertura de casa numerada** — Verifica que abrir duas vezes uma casa numerada revela apenas ela.
6. **Bandeira e derrota** — Marca e desmarca uma bomba, verifica a proteção da bandeira e o bloqueio após a explosão.
7. **Expansão e vitória** — Abre uma região vazia, preserva uma casa marcada e só vence ao revelar a 212ª casa segura.

## Colaborador

Luis Felipe Kamphorst
