function produto(a1, a2) {
  const novos_estados = [];
  const novos_iniciais = [];
  const novos_finais = [];

  const ids = new Map();
  const map = new Map();

  for (let estado_a of a1.estados) {
    for (let estado_b of a2.estados) {
      let valor = [estado_a.id, estado_b.id];

      let novo_estado = {
        id: novos_estados.length,
        nome: valor.join()
      };

      ids.set(novo_estado.id, valor);
      map.set(valor.join(), novo_estado.id);

      novos_estados.push(novo_estado);
      
      if (a1.inicial.includes(estado_a.id) && a2.inicial.includes(estado_b.id)) {
        novos_iniciais.push(novo_estado.id);
      }

      if (a1.final.includes(estado_a.id) && a2.final.includes(estado_b.id)) {
        novos_finais.push(novo_estado.id);
      }

    }
  }

  const eventos_a = a1.transicoes.reduce((set, a) => {
    set.add(a.evento);
    return set;
  }, new Set());

  const eventos = new Set();
  for (let t of a2.transicoes) {
    if (eventos_a.has(t.evento))
      eventos.add(t.evento);
  }

  const novas_transicoes = [];

  for (let novo_estado of novos_estados) {
    let oldId = ids.get(novo_estado.id);

    for (let t1 of a1.transicoes) {
      if (t1.de == oldId[0] && eventos.has(t1.evento)) {
        for (let tt of a2.transicoes) {
          if (tt.evento == t1.evento && tt.de == oldId[1]) {
            novas_transicoes.push({
              de: novo_estado.id,
              para: map.get([t1.para, tt.para].join()),
              evento: t1.evento
            });
          }
        }
      }
    }

    for (let t2 of a2.transicoes) {
      if (t2.de == oldId[1] && eventos.has(t2.evento)) {
        for (let tt of a1.transicoes) {
          if (tt.evento == t2.evento && tt.de == oldId[0]) {
            if (novas_transicoes.every(t => {
                return (
                  novo_estado.id != t.de && map.get([tt.para, t2.para].join()) != t.para && t2.evento != t.evento);
              })) {
              novas_transicoes.push({
                de: novo_estado.id,
                para: map.get([tt.para, t2.para].join()),
                evento: t2.evento
              });
            }
          }
        }
      }
    }
  }

  return {
    estados: novos_estados,
    transicoes: novas_transicoes,
    inicial: novos_iniciais,
    final: novos_finais,
    nome: a1.nome + '*' + a2.nome
  };
}

module.exports = produto;
