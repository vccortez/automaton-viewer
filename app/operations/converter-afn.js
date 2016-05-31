function converterAFN(automato) {
  const epsilon = '§';
  const DFA = { table: new Map() };

  const eventos = automato.transicoes.reduce((set, t) => {
    set.add(t.evento);
    return set;
  }, new Set());
  eventos.delete(epsilon);

  const startNFA = automato.estados.filter(
    e => automato.inicial.includes(e.id)
  );

  const inicial = closure(startNFA, automato, epsilon);

  const novos = new Set([inicial]);

  while (novos.size > 0) {
    for (let novo of novos) {
      // TODO: closure antes?
      // novo = closure(novo, automato, epsilon);

      if (exists(DFA.table, novo)) {
        continue;
      }

      const resultados = new Map();

      for (let evento of eventos) {
        let resultado = move(novo, automato, evento, epsilon);
        if (resultado.length == 0) {
          resultado = null;
        }

        resultados.set(evento, resultado);
      }

      DFA.table.set(novo, resultados);
    }

    novos.clear();

    for (let [state, results] of DFA.table) {
      for (let [evento, result] of results) {
        if (result == void(0)) {
          continue;
        }

        if (!exists(DFA.table, result) && result.length > 0) {
          if (!exists(novos, result)) {
            novos.add(result);
          }
        }
      }
    }
  }

  const ids = new Map();
  const finais = new Set();
  const table = [...DFA.table];
  DFA.nome = `${automato.nome}-afd`;

  DFA.estados = table.map((kv, i) => {
    let names = (kv[0].map(e => e.nome)).sort();
    let novoEstado = {
      id: i,
      nome: `{${names.join()}}`
    };
    ids.set(novoEstado.nome, novoEstado.id);
    if (kv[0].some(e => automato.final.includes(e.id))) {
      finais.add(novoEstado.id);
    }

    return novoEstado;
  });

  DFA.transicoes = table.reduce((arr, kv, i) => {
    let nome = `{${((kv[0].map(e => e.nome)).sort()).join()}}`;
    let de = ids.get(nome);
    kv[1].forEach((v, k) => {
      if (v == void(0)) {
        return;
      }

      let pnome = `{${((v.map(e => e.nome)).sort()).join()}}`;
      let para = ids.get(pnome);
      if (para != void(0))
        arr.push({
          de: de,
          para: para,
          evento: k
        });
    });
    return arr;
  }, []);

  DFA.inicial = [ids.get(`{${((inicial.map(e => e.nome)).sort()).join()}}`)];
  DFA.final = [...finais];
  delete DFA.table;

  return DFA;
}

function closure(entrada, automato, vazio) {
  const estados = mapStates(automato);
  let saida = [...entrada];

  while (true) {
    const novos = [];

    for (let es of saida) {
      let transicoes = automato.transicoes.filter(t => t.de == es.id);
      transicoes = transicoes.map(t => {
        t.de = parseInt(t.de);
        t.para = parseInt(t.para);
        return t;
      });

      for (let tr of transicoes) {
        if (tr.evento == vazio) {
          let e = estados.get(tr.para);

          if (!saida.includes(e)) {
            novos.push(e);
          }
        }
      }
    }

    if (novos.length == 0)
      break;

    saida = saida.concat(novos);
  }

  return saida;
}

function move(entrada, automato, evento, vazio) {
  const estados = mapStates(automato);
  const saida = [];

  for (let es of entrada) {
    let transicoes = automato.transicoes.filter(t => t.de == es.id);
    transicoes = transicoes.map(t => {
      t.de = parseInt(t.de);
      t.para = parseInt(t.para);
      return t;
    });

    for (let tr of transicoes) {
      if (tr.evento == evento) {
        let e = estados.get(tr.para);

        if (!saida.includes(e)) {
          saida.push(e);
        }
      }
    }
  }

  if (saida.length == 0) {
    return [];
  }

  return closure(saida, automato, vazio);
}

function mapStates(automato) {
  return automato.estados.reduce((map, estado) => {
    map.set(estado.id, estado);
    return map;
  }, new Map());
}

function exists(map, key) {
  for (let k of map.keys()) {
    if (k.length == key.length && k.every(el => key.includes(el))) {
      return true;
    }
  }

  return false;
}

module.exports = converterAFN;
