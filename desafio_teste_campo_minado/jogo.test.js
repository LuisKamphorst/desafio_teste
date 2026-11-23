const test = require('node:test');
const assert = require('node:assert/strict');
const { CampoMinado } = require('./jogo');

// As 40 primeiras casas, em ordem de leitura, contêm bombas.
const bombas = Array.from({ length: 40 }, (_, i) => i);
const iniciar = () => new CampoMinado(bombas);

test("Distribuição padrão", () => {
  const jogo = new CampoMinado();
  assert.equal(jogo.bombas.size, 40);
  assert.ok([...jogo.bombas].every(i => Number.isInteger(i) && i >= 0 && i < 252));
});

test("Configuração inválida", () => {
  for (const ultima of [1, -1, 252, 1.5]) {
    assert.throws(() => new CampoMinado([...bombas.slice(1), ultima]));
  }
  assert.throws(() => new CampoMinado(bombas.slice(1)));
});

test("Limites do tabuleiro", () => {
  const jogo = iniciar();
  assert.equal(jogo.indice(13, 17), 251);
  for (const [l,c] of [[14,0],[0,18],[-1,0],[0,-1]]) assert.throws(() => jogo.abrir(l,c));
});

test("Contagem nas bordas e diagonais", () => {
  const jogo = iniciar();
  assert.equal(jogo.numero(0,0), 3);
  assert.equal(jogo.numero(2,17), 2);
  assert.equal(jogo.numero(3,4), 1);
});

test("Abertura de casa numerada", () => {
  const jogo = iniciar();
  jogo.abrir(3,4);
  jogo.abrir(3,4);
  assert.deepEqual([...jogo.abertas], [58]);
});

test("Bandeira e derrota", () => {
  const jogo = iniciar();
  jogo.alternarBandeira(0,0);
  jogo.abrir(0,0);
  assert.equal(jogo.estado, 'jogando');
  jogo.alternarBandeira(0,0);
  jogo.abrir(0,0);
  assert.equal(jogo.estado, 'derrota');
  jogo.abrir(13,17);
  assert.equal(jogo.abertas.size, 0);
});

test("Expansão e vitória", () => {
  const jogo = iniciar();
  jogo.alternarBandeira(13,16);
  jogo.abrir(13,17);
  assert.equal(jogo.abertas.size, 211);
  assert.equal(jogo.estado, 'jogando');
  jogo.alternarBandeira(13,16);
  jogo.abrir(13,16);
  assert.equal(jogo.abertas.size, 212);
  assert.equal(jogo.estado, 'vitoria');
});
