function sequenciaValida(valores) {
  for (const bit of [0, 1]) {
    if (valores.filter(v => v === bit).length > 3) return false;
    for (let i = 2; i < 6; i++) {
      if (valores[i] === bit && valores[i-1] === bit && valores[i-2] === bit) return false;
    }
  }
  return true;
}

function grupoValido(grupo) {
  const completas = grupo.filter(seq => !seq.includes(null)).map(seq => seq.join(''));
  return grupo.every(sequenciaValida) && new Set(completas).size === completas.length;
}

function valido(grade) {
  if (!Array.isArray(grade) || grade.length !== 6) return false;
  for (const linha of grade) {
    if (!Array.isArray(linha) || linha.length !== 6) return false;
    for (const valor of linha) {
      if (![null, 0, 1].includes(valor)) return false;
    }
  }
  const colunas = grade[0].map((_, c) => grade.map(linha => linha[c]));
  return grupoValido(grade) && grupoValido(colunas);
}

class Sudoku {
  constructor(pistas) {
    if (!valido(pistas)) throw new Error('Grade inicial inválida.');
    this.grade = pistas.map(linha => [...linha]);
    this.fixas = pistas.map(linha => linha.map(v => v !== null));
  }

  jogar(l, c, valor) {
    if (![l,c].every(n => Number.isInteger(n) && n >= 0 && n < 6) ||
        this.fixas[l][c] || ![0, 1, null].includes(valor)) return false;
    const nova = this.grade.map(linha => [...linha]);
    nova[l][c] = valor;
    if (!valido(nova)) return false;
    this.grade = nova;
    return true;
  }

  completo() {
    return this.grade.every(linha => !linha.includes(null));
  }
}
module.exports = { Sudoku, valido };
