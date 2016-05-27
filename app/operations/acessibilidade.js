function acessibilidade(automato) {

  const estadosIn = [];
  const transicoesMo = [];
  let temTransicoes = false;

  for (let es of automato.estados) {
    temTransicoes = false;

    for (let tr of automato.transicoes) {
      if (es.id == tr.para && !(es.id == tr.de) && !(transicoesMo.some(t => tr.de == t.de && tr.para == t.para && tr.evento == t.evento))) {
        temTransicoes = true;
      }
    }

    if (!temTransicoes && !(automato.inicial.includes(es.id))) {
      estadosIn.push(es);
      for (let tr of automato.transicoes) {
        if (tr.de == es.id) {
          transicoesMo.push(tr);
        }
      }
    }
  }

  const estados = automato.estados.filter(e => !estadosIn.includes(e));
  const transicoes = automato.transicoes.filter(t => !transicoesMo.includes(t));

  automato.estados = estados;
  automato.transicoes = transicoes;

  if (estadosIn.length == 0 && transicoesMo.length == 0) {
    return automato;
  } else {
    return acessibilidade(automato);
  }
}

module.exports = acessibilidade;
