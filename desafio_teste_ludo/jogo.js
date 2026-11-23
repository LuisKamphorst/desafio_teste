const BASE = -1;
const CHEGADA = 57;

class Ludo {
  constructor() {
    this.peoes = [Array(4).fill(BASE), Array(4).fill(BASE)];
    this.vez = 0;
    this.dado = null;
    this.vencedor = null;
  }

  destino(posicao) {
    if (posicao === BASE) return this.dado === 6 ? 0 : null;
    const destino = posicao + this.dado;
    return destino <= CHEGADA ? destino : null;
  }

  rolar(jogador, valor = 1 + Math.floor(Math.random() * 6)) {
    if (this.vencedor !== null || jogador !== this.vez || this.dado !== null) {
      throw new Error('Não é possível rolar agora.');
    }
    if (!Number.isInteger(valor) || valor < 1 || valor > 6) throw new Error('Dado inválido.');
    this.dado = valor;
    const opcoes = [];
    this.peoes[jogador].forEach((p, i) => {
      if (this.destino(p) !== null) opcoes.push(i);
    });
    if (!opcoes.length) this.encerrarJogada();
    return opcoes;
  }

  encerrarJogada() {
    if (this.dado !== 6) this.vez = 1 - this.vez;
    this.dado = null;
  }

  mover(jogador, peao) {
    if (jogador !== this.vez || this.dado === null ||
        !Number.isInteger(peao) || peao < 0 || peao > 3) throw new Error('Jogada inválida.');
    const destino = this.destino(this.peoes[jogador][peao]);
    if (destino === null) throw new Error('Peão sem movimento.');
    this.peoes[jogador][peao] = destino;
    const casa = (destino + jogador * 26) % 52;
    if (destino < 52 && casa !== 0 && casa !== 26) {
      const adversario = 1 - jogador;
      this.peoes[adversario] = this.peoes[adversario].map(p =>
        p >= 0 && p < 52 && (p + adversario * 26) % 52 === casa ? BASE : p
      );
    }
    if (this.peoes[jogador].every(p => p === CHEGADA)) this.vencedor = jogador;
    this.encerrarJogada();
  }
}
module.exports = { Ludo };
