const DataSet = require('vis').DataSet;

function parse(json) {
  const nodes = json.estados.map(sta => {
    let id, label, ini, fin, group;

    id = sta.id;
    label = sta.nome;
    ini = json['inicial'].indexOf(id) !== -1 ? true : false;
    fin = json['final'].indexOf(id) !== -1 ? true : false;

    if (ini && fin)
      group = 'inicial-final';
    else if (ini)
      group = 'inicial';
    else if (fin)
      group = 'final';
    else
      group = 'normal';

    return { id, label, group };
  });

  const edges = json.transicoes.map(trs => {
    let to, from, label;

    from = trs.de;
    to = trs.para;
    label = trs.evento;

    return { from, to, label, arrows: 'to' };
  });

  return { nodes: new DataSet(nodes), edges: new DataSet(edges) };
}

module.exports = parse;
