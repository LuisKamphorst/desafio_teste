const test = require('node:test');
const assert = require('node:assert/strict');
const { Ludo } = require('./jogo');

// Distâncias relativas permitem montar situações próximas da captura e da chegada.
function avancar(jogo, jogador, dado, peao) {
  jogo.rolar(jogador, dado);
  jogo.mover(jogador, peao);
}

test("Base e passagem da vez", () => {
  const jogo = new Ludo();
  assert.deepEqual(jogo.peoes, [Array(4).fill(-1), Array(4).fill(-1)]);
  assert.deepEqual(jogo.rolar(0,5), []);
  assert.equal(jogo.vez, 1);
  assert.deepEqual(jogo.rolar(1,6), [0,1,2,3]);
  jogo.mover(1,2);
  assert.equal(jogo.peoes[1][2], 0);
  assert.equal(jogo.vez, 1);
});

test("Turnos e dados inválidos", () => {
  const jogo = new Ludo();
  assert.throws(() => jogo.rolar(1,6));
  for (const v of [0,7,2.5]) assert.throws(() => jogo.rolar(0,v));
  assert.throws(() => jogo.mover(0,1));
  jogo.rolar(0,6);
  assert.throws(() => jogo.rolar(0,6));
  assert.throws(() => jogo.mover(1,0));
  assert.throws(() => jogo.mover(0,4));
  jogo.mover(0,0);
  avancar(jogo,0,4,0);
  assert.equal(jogo.peoes[0][0], 4);
  assert.equal(jogo.vez, 1);
});

test("Captura na pista comum", () => {
  const jogo = new Ludo();
  jogo.peoes[0][0] = 25;
  jogo.peoes[1][2] = 2;
  avancar(jogo,0,3,0);
  assert.equal(jogo.peoes[0][0], 28);
  assert.equal(jogo.peoes[1][2], -1);
});

test("Proteção nas duas saídas", () => {
  for (const atacante of [0,1]) {
    const jogo = new Ludo();
    jogo.vez = atacante;
    jogo.peoes[atacante][0] = 25;
    jogo.peoes[1-atacante][0] = 0;
    avancar(jogo,atacante,1,0);
    assert.equal(jogo.peoes[1-atacante][0], 0);
  }
});

test("Corredor privativo", () => {
  const jogo = new Ludo();
  jogo.peoes[0][0] = 51;
  jogo.peoes[1][0] = 27;
  avancar(jogo,0,2,0);
  assert.equal(jogo.peoes[0][0], 53);
  assert.equal(jogo.peoes[1][0], 27);
});

test("Chegada exata e vitória", () => {
  const jogo = new Ludo();
  jogo.peoes[0] = [57,57,57,55];
  assert.deepEqual(jogo.rolar(0,3), []);
  assert.deepEqual(jogo.rolar(1,2), []);
  assert.equal(jogo.vencedor, null);
  assert.deepEqual(jogo.rolar(0,2), [3]);
  assert.throws(() => jogo.mover(0,0));
  jogo.mover(0,3);
  assert.equal(jogo.vencedor, 0);
  assert.throws(() => jogo.rolar(1,6));
});
