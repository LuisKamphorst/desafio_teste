# Dominó

## Especificação

Partida de compra entre dois jogadores com peças do duplo-seis. Cada um recebe sete peças e as 14 restantes formam o monte. Nesta variante, o jogador 0 abre com qualquer peça. Em cada turno, encaixa-se uma peça em uma das pontas. Sem encaixe, compra-se uma peça por vez até poder jogar ou esgotar o monte. Sem compra nem jogada, passa-se a vez. Vence quem esvaziar a mão. Após dois passes consecutivos, vence a menor soma das mãos, com empate se as somas forem iguais.

## Execução

Com Node.js 18 ou superior, abra o terminal na pasta que contém este README e execute `npm test`. O projeto usa o executor de testes do Node.js e dispensa instalação de dependências. A implementação está em `jogo.js` e os cenários estão em `jogo.test.js`.

## Casos de teste

1. **Distribuição para dois jogadores** — Reúne as duas mãos e o monte e confere todas as 28 peças únicas.
2. **Abertura e alternância** — Joga a peça 0–1 em mesa vazia e verifica mão, vez e bloqueio do adversário na abertura.
3. **Encaixe e orientação** — Inverte peças nas duas pontas para manter valores iguais em contato.
4. **Jogada incompatível** — Tenta encaixar 3–4 na ponta 1 e verifica que mão, mesa e vez foram preservadas.
5. **Compra e vitória por mão vazia** — Compra uma peça, exige seu uso quando há encaixe e encerra quando o adversário baixa a última peça.
6. **Partida bloqueada e empate** — Após dois passes sem monte, compara os pontos restantes e cobre vitória de cada jogador e empate.

## Colaborador

Luis Felipe Kamphorst
