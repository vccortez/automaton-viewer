function minimizacao(automato) {
  const eventos = automato.transicoes.reduce((m, t) => {
    m.add(t.evento);
    return m;
  }, new Set());

  let estados = automato.estados.map(e => {
    return [{
      id: e.id,
      nome: e.nome,
      grupo: automato['final'].includes(e.id) ? 1 : 0
    }];
  });

  let antigos = estados.reduce((p, c) => {
    p.add(c[0].grupo);
    return p;
  }, new Set());

  const mapa = automato.transicoes.reduce((m, t) => {
    if (!m.has(t.de)) {
      m.set(t.de, new Map());
    }
    m.get(t.de).set(t.evento, t.para);
    return m;
  }, new Map());

  let novos, prev, curr;
  prev = antigos.size;
  while (true) {
    novos = {};

    for (let e of eventos) {
      for (let i = 0; i < estados.length; ++i) {
        let d = mapa.get(estados[i][0].id).get(e);
        let g = estados.find(es => es[0].id === d);
        estados[i].push(g[0].grupo);
      }
    }

    for (let s of estados) {
      const chave = (s.slice(1)).join() + '-' + s[0].grupo;
      if (!(chave in novos)) {
        novos[chave] = [];
      }
      novos[chave].push(s[0]);
    }

    let keys = Object.keys(novos);
    for (let i = 0; i < keys.length; ++i) {
      for (let s of novos[keys[i]]) {
        s.grupo = i;
      }
    }

    curr = keys.length;
    if (prev < curr) {
      prev = curr;
      for (let s of estados) {
        s.splice(1);
      }
      continue;
    } else {
      break;
    }
  }

  const nIds = Object.keys(novos).reduce((map, k, i) => {
    for (let es of novos[k])
      map.set(es.id, i);
    return map;
  }, new Map());

  estados = Object.keys(novos).map((k, i) => {
    return {
      id: i,
      nome: `s${i}`,
    };
  });

  const transicoes = automato.transicoes.reduce((arr, t) => {
    let nTra = {
      de: nIds.get(t.de),
      para: nIds.get(t.para),
      evento: t.evento
    };

    if (arr.some(tr => (nTra.de === tr.de) && (nTra.para === tr.para) && (nTra.evento === tr.evento))) {
      return arr;
    } else {
      arr.push(nTra);
      return arr;
    }
  }, []);

  let inicial = automato.inicial.reduce((set, id) => {
    set.add(nIds.get(id));
    return set;
  }, new Set());
  let final = automato.final.reduce((set, id) => {
    set.add(nIds.get(id));
    return set;
  }, new Set());
  inicial = [...inicial];
  final = [...final];
  const nome = automato.nome;

  return {nome, estados, inicial, final, transicoes};
}

module.exports = minimizacao;
