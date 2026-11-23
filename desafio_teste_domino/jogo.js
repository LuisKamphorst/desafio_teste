function baralho() {
  const pecas = [];
  for (let a = 0; a <= 6; a++) {
    for (let b = a; b <= 6; b++) pecas.push([a, b]);
  }
  return pecas;
}

function embaralhar() {
  const pecas = baralho();
  for (let i = pecas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pecas[i], pecas[j]] = [pecas[j], pecas[i]];
  }
  return pecas;
}

class Domino {
  constructor(pecas = embaralhar()) {
    const chaves = new Set(baralho().map(p => p.join('-')));
    if (pecas.length !== 28 || !pecas.every(p => Array.isArray(p) &&
        p.length === 2 && p.every(Number.isInteger) && chaves.delete(p.join('-')))) {
      throw new Error('O conjunto deve conter as 28 peças do duplo-seis na orientação canônica.');
    }
    const copia = pecas.map(p => [...p]);
    this.maos = [copia.splice(0, 7), copia.splice(0, 7)];
    this.monte = copia;
    this.mesa = [];
    this.vez = 0;
    this.passes = 0;
    this.resultado = null;
  }

  conferirVez(jogador) {
    if (this.resultado !== null || jogador !== this.vez) throw new Error('Fora da vez.');
  }

  podeJogar(peca) {
    if (!this.mesa.length) return true;
    return peca.includes(this.mesa[0][0]) || peca.includes(this.mesa.at(-1)[1]);
  }

  jogar(jogador, indice, lado) {
    this.conferirVez(jogador);
    const mao = this.maos[jogador];
    if (!Number.isInteger(indice) || !mao[indice] || !['esquerda','direita'].includes(lado)) {
      throw new Error('Peça ou lado inválido.');
    }
    let [a, b] = mao[indice];
    const esquerda = lado === 'esquerda';
    if (this.mesa.length) {
      const ponta = esquerda ? this.mesa[0][0] : this.mesa.at(-1)[1];
      if (a !== ponta && b !== ponta) throw new Error('A peça não encaixa.');
      if ((esquerda ? b : a) !== ponta) [a, b] = [b, a];
    }
    if (esquerda) this.mesa.unshift([a,b]);
    else this.mesa.push([a,b]);
    mao.splice(indice, 1);
    this.passes = 0;
    if (mao.length === 0) this.resultado = jogador;
    else this.vez = 1 - jogador;
  }

  comprarOuPassar(jogador) {
    this.conferirVez(jogador);
    if (this.maos[jogador].some(p => this.podeJogar(p))) throw new Error('Há uma jogada possível.');
    if (this.monte.length) {
      this.maos[jogador].push(this.monte.pop());
      return 'compra';
    }
    this.passes++;
    this.vez = 1 - jogador;
    if (this.passes === 2) {
      const [a, b] = this.maos.map(mao => mao.reduce((s, [x,y]) => s + x + y, 0));
      this.resultado = a === b ? 'empate' : (a < b ? 0 : 1);
    }
    return 'passe';
  }
}
module.exports = { Domino, baralho };
