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

  const selfCircle = {};

  const edges = json.transicoes.map((trs, i) => {
    let to, from, label, selfReferenceSize = false;

    from = trs.de;
    to = trs.para;
    label = trs.evento;

    if (from === to) {
      if (selfCircle[from] == void(0))
        selfCircle[from] = [];

      selfCircle[from].push(label);
      selfReferenceSize = (selfCircle[from].indexOf(label) + 2) * 8;
    }

    return { from, to, label, arrows: { to: { enabled: true, scaleFactor: 0.5 } }, selectionWidth: 0, selfReferenceSize };
  });

  return { nodes: new DataSet(nodes), edges: new DataSet(edges) };
}

module.exports = parse;
