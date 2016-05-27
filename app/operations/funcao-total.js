function funcaoTotal(automato) {
  const eventos = new Set();

  for (let e of automato.transicoes) {
    eventos.add(e.evento);
  }

  let id = automato.estados.length * 2;
  let nome = `dead${id}`;

  const dead = { id, nome };

  const total = [];

  for (let i = 0, el = automato.estados.length; i < el; ++i) {
    let estado = automato.estados[i];

    let transicoes = automato.transicoes
      .filter(t => t.de === estado.id)
      .map(t => t.evento);

    for (let e of eventos) {
      if (transicoes.indexOf(e) === -1) {
        total.push({
          de: estado.id,
          para: dead.id,
          evento: e,
        });
      }
    }
  }

  if (total.length === 0)
    return automato;

  automato.estados.push(dead);

  for (let e of eventos) {
    total.push({ de: dead.id, para: dead.id, evento: e });
  }

  automato.transicoes = automato.transicoes.concat(total);
  automato.nome += '-ft';

  return automato;
}

module.exports = funcaoTotal;
