function composicaoParalela(a1, a2) {
  const novos_estados = [];
  const novos_iniciais = [];
  const novos_finais = [];

  for (let estado_a of a1.estados) {
    for (let estado_b of a2.estados) {
      let novo_estado = {
        id: `${estado_a.id},${estado_b.id}`,
        nome: estado_a.nome + estado_b.nome
      };

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
    for (let t1 of a1.transicoes) {
      if (t1.de == novo_estado.id.split(',')[0]) {
        if (eventos_b.has(t1.evento)) {
          for (let tt of a2.transicoes) {
            if (tt.evento == t1.evento && tt.de == novo_estado.id.split(',')[1]) {
              novas_transicoes.push({
                de: novo_estado.id,
                para: `${t1.para},${tt.para}`,
                evento: t1.evento
              });
            }
          }
        } else {
          novas_transicoes.push({
            de: novo_estado.id,
            para: `${t1.para},${novo_estado.id.split(',')[1]}`,
            evento: t1.evento
          });
        }
      }
    }

    for (let t2 of a2.transicoes) {
      if (t2.de == novo_estado.id.split(',')[1]) {
        if (eventos_a.has(t2.evento)) {
          for (let tt of a1.transicoes) {
            if (tt.evento == t2.evento && tt.de == novo_estado.id.split(',')[0]) {
              if (novas_transicoes.every(t => {
                return (
                  novo_estado.id != t.de && `${tt.para},${t2.para}` != t.para && t2.evento != t.evento);
                })) {
                novas_transicoes.push({
                  de: novo_estado.id,
                  para: `${tt.para},${t2.para}`,
                  evento: t2.evento
                });
              }
            }
          }
        } else {
          if (novas_transicoes.every(t => {
            return (
              novo_estado.id != t.de && `${novo_estado.id.split(',')[0]},${t2.para}` != t.para && t2.evento != t.evento );
            })) {
            novas_transicoes.push({
              de: novo_estado.id,
              para: `${novo_estado.id.split(',')[0]},${t2.para}`,
              evento: t2.evento
            });
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
    nome: 'teste'
  };
}

module.exports = composicaoParalela;
