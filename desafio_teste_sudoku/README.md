# Sudoku binário

## Especificação

Grade de 6 × 6. Cada linha e coluna completa deve conter três zeros e três uns. Três símbolos iguais consecutivos são proibidos nos dois eixos. Linhas completas devem ser distintas entre si, assim como as colunas completas. Pistas iniciais são fixas. Uma jogada pode preencher ou apagar uma casa livre, desde que preserve as regras locais.

## Execução

Com Node.js 18 ou superior, abra o terminal na pasta que contém este README e execute `npm test`. O projeto usa o executor de testes do Node.js e dispensa instalação de dependências. A implementação está em `jogo.js` e os cenários estão em `jogo.test.js`.

## Casos de teste

1. **Formato e domínio** — Exige seis linhas de seis posições e aceita somente zero, um ou casa vazia.
2. **Trincas nos dois eixos** — Coloca três símbolos iguais no fim de uma linha e repete na vertical.
3. **Equilíbrio entre símbolos** — Insere quatro símbolos iguais sem trinca e verifica o limite em ambos os eixos.
4. **Unicidade das sequências completas** — Rejeita duas linhas completas iguais e, transpondo a grade, duas colunas completas iguais.
5. **Pistas e edição** — Mantém pistas fixas, rejeita coordenadas e símbolos inválidos e permite apagar uma jogada.
6. **Conclusão da grade** — Preenche a última casa da solução e confirma que a partida passou de incompleta para completa.

## Colaborador

Luis Felipe Kamphorst
