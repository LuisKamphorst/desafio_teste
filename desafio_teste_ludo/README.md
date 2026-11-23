# Ludo

## Especificação

Partida entre dois jogadores com quatro peões cada. Variante adotada: pista comum de 52 casas, saídas opostas (0 e 26) seguras e corredor privativo. A distância relativa de cada peão vai de −1 (base) a 0–51 (pista), 52–56 (corredor) e 57 (chegada). Tirar seis permite sair da base ou mover outro peão e dá novo lançamento. Sem movimento legal, o dado é consumido. Alcançar adversários em casa comum desprotegida devolve todos eles à base. Peões podem compartilhar casas, sem bloqueios. Não há bônus por captura nem punição por seis consecutivos. Vence quem chegar com os quatro peões por contagem exata.

## Execução

Com Node.js 18 ou superior, abra o terminal na pasta que contém este README e execute `npm test`. O projeto usa o executor de testes do Node.js e dispensa instalação de dependências. A implementação está em `jogo.js` e os cenários estão em `jogo.test.js`.

## Casos de teste

1. **Base e passagem da vez** — Com todos na base, um cinco passa a vez e um seis permite escolher um dos quatro peões e rolar novamente.
2. **Turnos e dados inválidos** — Rejeita jogadas fora da vez, dados inválidos e segundo lançamento antes da escolha do peão.
3. **Captura na pista comum** — Traduz as distâncias relativas em uma casa comum e devolve o peão adversário à base.
4. **Proteção nas duas saídas** — Repete o encontro nas casas iniciais dos dois jogadores e verifica que elas impedem a captura.
5. **Corredor privativo** — Entra no corredor final e preserva o adversário que ocupa a posição equivalente na pista comum.
6. **Chegada exata e vitória** — Rejeita ultrapassagem, exige movimento exato do último peão e bloqueia lançamentos após a vitória.

## Colaborador

Luis Felipe Kamphorst
