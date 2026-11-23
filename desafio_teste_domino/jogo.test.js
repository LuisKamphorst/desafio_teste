const test = require('node:test');
const assert = require('node:assert/strict');
const { Domino, baralho } = require('./jogo');

// Recortes de meio/fim de partida isolam uma regra sem depender do sorteio.
function cenario(mao0, mao1, mesa, monte = []) {
  const jogo = new Domino(baralho());
  jogo.maos = [mao0, mao1];
  jogo.mesa = mesa;
  jogo.monte = monte;
  return jogo;
}

test("Distribuição para dois jogadores", () => {
  const jogo = new Domino();
  assert.deepEqual(jogo.maos.map(m => m.length), [7,7]);
  assert.equal(jogo.monte.length, 14);
  const conjunto = [...jogo.maos.flat(), ...jogo.monte];
  assert.deepEqual(conjunto.map(p => p.join('-')).sort(), baralho().map(p => p.join('-')).sort());
  assert.equal(new Set(conjunto.map(p => p.join('-'))).size,28);
});

test("Abertura e alternância", () => {
  const jogo = new Domino(baralho());
  assert.throws(() => jogo.jogar(1,0,'direita'));
  jogo.jogar(0,1,'direita');
  assert.deepEqual(jogo.mesa, [[0,1]]);
  assert.equal(jogo.maos[0].length, 6);
  assert.equal(jogo.vez, 1);
});

test("Encaixe e orientação", () => {
  const jogo = cenario([[1,4],[0,0]], [[2,5],[6,6]], [[1,5]]);
  jogo.jogar(0,0,'esquerda');
  jogo.jogar(1,0,'direita');
  assert.deepEqual(jogo.mesa, [[4,1],[1,5],[5,2]]);
});

test("Jogada incompatível", () => {
  const jogo = cenario([[3,4]], [[2,5]], [[1,5]]);
  assert.throws(() => jogo.jogar(0,0,'esquerda'));
  assert.deepEqual(jogo.maos[0], [[3,4]]);
  assert.deepEqual(jogo.mesa, [[1,5]]);
  assert.equal(jogo.vez, 0);
});

test("Compra e vitória por mão vazia", () => {
  const jogo = cenario([[3,4]], [[0,5]], [[1,5]], [[1,2]]);
  assert.equal(jogo.comprarOuPassar(0), 'compra');
  assert.equal(jogo.vez, 0);
  assert.throws(() => jogo.comprarOuPassar(0));
  jogo.jogar(0,1,'esquerda');
  jogo.jogar(1,0,'direita');
  assert.equal(jogo.resultado, 1);
  assert.throws(() => jogo.comprarOuPassar(0));
});

test("Partida bloqueada e empate", () => {
  for (const [peca, esperado] of [[[0,0],0], [[4,4],1], [[0,3],'empate']]) {
    const jogo = cenario([peca], [[1,2]], [[6,6]]);
    assert.equal(jogo.comprarOuPassar(0), 'passe');
    assert.equal(jogo.resultado, null);
    jogo.comprarOuPassar(1);
    assert.equal(jogo.resultado, esperado);
  }
});
