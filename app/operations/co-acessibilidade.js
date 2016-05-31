function coAcessibilidade(automato) {
  const estadosCo = Array.from(automato.final);

  const estados = [];
  const transicoes = [];

  let anterior;

  do {
    anterior = estadosCo.length;

    for (let t of automato.transicoes) {
      if (estadosCo.includes(t.para) && !estadosCo.includes(t.de)) {
        estadosCo.push(t.de);
      }
    }
  } while (estadosCo.length != anterior);

  for (let coId of estadosCo) {
    let e = automato.estados.find(e => e.id == coId);
    if (e != void(0)) {
      estados.push(e);
    }
  }

  for (let t of automato.transicoes) {
    if (estadosCo.includes(t.de) && estadosCo.includes(t.para)) {
      transicoes.push(t);
    }
  }

  return {
    nome: automato.nome + '-co',
    estados,
    transicoes,
    final: automato.final,
    inicial: automato.inicial
  };
}

module.exports = coAcessibilidade;
