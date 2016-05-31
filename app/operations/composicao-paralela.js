function composicaoParalela(a1, a2) {
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
        nome: [estado_a.nome, estado_b.nome].join()
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

  const eventos_b = a2.transicoes.reduce((set, a) => {
    set.add(a.evento);
    return set;
  }, new Set());

  const novas_transicoes = [];

  for (let novo_estado of novos_estados) {
    let oldId = ids.get(novo_estado.id);

    let transicoes = a1.transicoes.filter(t => t.de == oldId[0]);

    for (let t1 of transicoes) {
      if (eventos_b.has(t1.evento)) {
        let tt = a2.transicoes.find(t => t.de == oldId[1] && t.evento == t1.evento);
        if (tt != void(0)) {
          novas_transicoes.push({
            de: novo_estado.id,
            para: map.get([t1.para, tt.para].join()),
            evento: t1.evento
          });
        }
      } else {
        novas_transicoes.push({
          de: novo_estado.id,
          para: map.get([t1.para, oldId[1]].join()),
          evento: t1.evento
        });
      }
    }

    transicoes = a2.transicoes.filter(t => t.de == oldId[1]);

    for (let t2 of transicoes) {
      if (eventos_a.has(t2.evento)) {
        let tt = a1.transicoes.find(t => t.de == oldId[0] && t.evento == t2.evento);
        if (tt != void(0)) {
          novas_transicoes.push({
            de: novo_estado.id,
            para: map.get([tt.para, t2.para].join()),
            evento: t2.evento
          });
        }
      } else {
        novas_transicoes.push({
          de: novo_estado.id,
          para: map.get([oldId[0], t2.para].join()),
          evento: t2.evento
        });
      }
    }
  }

  return {
    estados: novos_estados,
    transicoes: novas_transicoes,
    inicial: novos_iniciais,
    final: novos_finais,
    nome: a1.nome + '+' + a2.nome
  };
}

module.exports = composicaoParalela;
