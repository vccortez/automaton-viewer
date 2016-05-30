exports.eclosure = function eclosure(automato, es, vazio) {
  const alcancaveis = new Set();
  let tam_anterior;

  alcancaveis.add(es.id);
  do {
    tam_anterior = alcancaveis.size;

    for (let transicao of automato.transicoes) {
      if (transicao.evento == vazio && !alcancaveis.has(transicao.para) &&
             alcancaveis.has(transicao.de)) {
        alcancaveis.add(transicao.para);
      }
    }
  } while (tam_anterior != alcancaveis.size);

  return [...alcancaveis].map(id => automato.estados.find(e => e.id == id));
};

exports.move = function move(automato, es, ev) {
  const alcancaveis = new Set();

  for (let transicao of automato.transicoes) {
    if (es.id == transicao.de && transicao.evento == ev && !alcancaveis.has(transicao.para)) {
      alcancaveis.add(transicao.para);
    }
  }

  return [...alcancaveis].map(id => automato.estados.find(e => e.id == id));
};
