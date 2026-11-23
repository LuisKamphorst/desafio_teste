const test = require('node:test');
const assert = require('node:assert/strict');
const { Sudoku, valido } = require('./jogo');

const vazia = () => Array.from({ length: 6 }, () => Array(6).fill(null));
const solucao = ['001011','010110','101100','011001','110010','100101']
  .map(linha => [...linha].map(Number));

test("Formato e domínio", () => {
  assert.ok(valido(vazia()));
  assert.equal(valido(vazia().slice(1)), false);
  const grade = vazia();
  grade[2].pop();
  assert.equal(valido(grade), false);
  grade[2].push('1');
  assert.throws(() => new Sudoku(grade));
});

test("Trincas nos dois eixos", () => {
  for (const bit of [0,1]) {
    const grade = vazia();
    grade[0].fill(bit, 3);
    assert.equal(valido(grade), false);
    assert.equal(valido(grade[0].map((_, c) => grade.map(l => l[c]))), false);
  }
});

test("Equilíbrio entre símbolos", () => {
  for (const bit of [0,1]) {
    const grade = vazia();
    grade[2] = [bit, bit, 1-bit, bit, bit, null];
    assert.equal(valido(grade), false);
    assert.equal(valido(grade[0].map((_, c) => grade.map(l => l[c]))), false);
  }
});

test("Unicidade das sequências completas", () => {
  const grade = vazia();
  grade[0] = [...solucao[0]];
  grade[1] = [...solucao[0]];
  assert.equal(valido(grade), false);
  assert.equal(valido(grade[0].map((_, c) => grade.map(l => l[c]))), false);
});

test("Pistas e edição", () => {
  const grade = vazia();
  grade[0][0] = 1;
  const jogo = new Sudoku(grade);
  assert.equal(jogo.jogar(0,0,0), false);
  assert.equal(jogo.jogar(-1,0,1), false);
  assert.equal(jogo.jogar(0,1,2), false);
  assert.ok(jogo.jogar(0,1,1));
  assert.equal(jogo.jogar(0,2,1), false);
  assert.equal(jogo.grade[0][2], null);
  assert.ok(jogo.jogar(0,1,null));
  assert.deepEqual(jogo.grade, grade);
});

test("Conclusão da grade", () => {
  const pistas = solucao.map(l => [...l]);
  pistas[5][5] = null;
  const jogo = new Sudoku(pistas);
  assert.equal(jogo.completo(), false);
  assert.ok(jogo.jogar(5,5,1));
  assert.ok(jogo.completo());
  assert.deepEqual(jogo.grade, solucao);
});
