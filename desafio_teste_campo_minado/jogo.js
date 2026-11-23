const LINHAS = 14;
const COLUNAS = 18;
const TOTAL = LINHAS * COLUNAS;

function sortearBombas() {
  const casas = new Set();
  while (casas.size < 40) casas.add(Math.floor(Math.random() * TOTAL));
  return [...casas];
}

class CampoMinado {
  constructor(bombas = sortearBombas()) {
    this.bombas = new Set(bombas);
    if (this.bombas.size !== 40 || bombas.length !== 40 ||
        bombas.some(i => !Number.isInteger(i) || i < 0 || i >= TOTAL)) {
      throw new Error('São necessárias 40 bombas em casas distintas do tabuleiro.');
    }
    this.abertas = new Set();
    this.bandeiras = new Set();
    this.estado = 'jogando';
  }

  indice(linha, coluna) {
    if (!Number.isInteger(linha) || linha < 0 || linha >= LINHAS ||
        !Number.isInteger(coluna) || coluna < 0 || coluna >= COLUNAS) {
      throw new Error('Casa fora do tabuleiro.');
    }
    return linha * COLUNAS + coluna;
  }

  vizinhas(i) {
    const linha = Math.floor(i / COLUNAS);
    const coluna = i % COLUNAS;
    const casas = [];
    for (let l = Math.max(0, linha - 1); l <= Math.min(LINHAS - 1, linha + 1); l++) {
      for (let c = Math.max(0, coluna - 1); c <= Math.min(COLUNAS - 1, coluna + 1); c++) {
        const casa = l * COLUNAS + c;
        if (casa !== i) casas.push(casa);
      }
    }
    return casas;
  }

  alternarBandeira(linha, coluna) {
    const i = this.indice(linha, coluna);
    if (this.estado !== 'jogando' || this.abertas.has(i)) return;
    if (!this.bandeiras.delete(i)) this.bandeiras.add(i);
  }

  abrir(linha, coluna) {
    const i = this.indice(linha, coluna);
    if (this.estado !== 'jogando' || this.bandeiras.has(i) || this.abertas.has(i)) return;
    if (this.bombas.has(i)) {
      this.estado = 'derrota';
      return;
    }
    const fila = [i];
    while (fila.length) {
      const casa = fila.pop();
      if (this.abertas.has(casa) || this.bandeiras.has(casa)) continue;
      this.abertas.add(casa);
      const vizinhas = this.vizinhas(casa);
      if (vizinhas.every(v => !this.bombas.has(v))) fila.push(...vizinhas);
    }
    if (this.abertas.size === TOTAL - 40) this.estado = 'vitoria';
  }

  numero(linha, coluna) {
    return this.vizinhas(this.indice(linha, coluna)).filter(i => this.bombas.has(i)).length;
  }
}
module.exports = { CampoMinado };
