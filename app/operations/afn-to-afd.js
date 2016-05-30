const move = require('./util.js').move;
const eclosure = require('./util.js').eclosure;

function setClosure(automato, set_est, vazio) {
  const alcancaveis = new Set();
  let es_temp;

  for (let es1 of set_est) {
    alcancaveis.add(es1.id);
  }

  for (let es2 of set_est) {
    es_temp = eclosure(automato, es2, vazio);

    for (let es3 of es_temp) {
      if (!alcancaveis.has(es3.id)) {
        alcancaveis.add(es3.id);
      }
    }
  }

  return [...alcancaveis].map(id => automato.estados.find(e => e.id == id));
}

function setMove(automato, set_est, ev) {
  const alcancaveis = new Set();
  let es_temp;

  for (let es1 of set_est) {
    es_temp = move(automato, es1, ev);

    for (let es2 of es_temp) {
      if (!alcancaveis.has(es2.id)) {
        alcancaveis.add(es2.id);
      }
    }
  }

  return [...alcancaveis].map(id => automato.estados.find(e => e.id == id));
}

function geraEstadoAfd(automato, set_est, ev, vazio) {
  let esAfd = new Set();
  let es_temp;

  //conforme passo 2 do algoritmo do site
  es_temp = setMove(automato, set_est, ev);
  esAfd = setClosure(automato, es_temp, vazio);

  return new Set(esAfd);
}

//gera a nomenclatura necessaria para representar um estado do AFD
//a partir de um conjunto de estados do AFN
function unificaEstados(set_est) {
  const est_unificado = { id: '', nome: '' };

  for (let es of set_est) {
    est_unificado.id = est_unificado.id + es.id;
    est_unificado.nome = est_unificado.nome + es.nome;
  }

  return (est_unificado);
}

function afntoAfd(automato) {
  const TRANS_VAZIA = '§';
  const autoafd = {};
  const esNovos = new Set(); //novos estados serão conjuntos dos estados do AFN
  let esInicial;
  let esAux;
  const pilha = []; //usada na geração de estados para o AFD
  let simbolos;
  let tinha_es_final;

  //conforme passo 1 do algoritmo do site
  const iniciais = automato.estados.filter(e => automato.inicial.includes(e.id));
  esInicial = setClosure(automato, iniciais, TRANS_VAZIA);

  esNovos.add(esInicial);
  pilha.push(esInicial);

  simbolos = automato.transicoes.reduce((set, t) => {
    set.add(t.evento);
    return set;
  }, new Set());

  if (simbolos.has(TRANS_VAZIA))
    simbolos.delete(TRANS_VAZIA); //trasições vazias são tratadas na função eclosure

  //aqui descobrimos novos estados para o AFD (se existirem!)
  do {
    esAux = pilha.pop();
    for (let simb of simbolos) {
      esAux = geraEstadoAfd(automato, esAux, simb, TRANS_VAZIA);
      // TODO: comparar conjuntos de estados

      if (!([...esNovos].some(set => {
        let ids = new Set([...esAux].map(x => x.id));
        let cond = (set.length == ids.size && set.every(s => ids.has(s.id)));
        return (cond);
      }))) {
        esNovos.add([...esAux]);
        pilha.push(esAux); //empilha para depois ver se ele gera novos estados para o AFD
      }
    }
  } while (pilha.length > 0);


  //montagem do "autoafd" para ser retornado
  autoafd.nome = automato.nome + '-afd';
  const ini = unificaEstados(esInicial);
  autoafd.inicial = [ini.id];
  autoafd.estados = [];
  autoafd.transicoes = [];
  autoafd.final = [];

  //continuando a montagem do "autoafd"
  for (let esNovo of esNovos) {
    let novoDe = unificaEstados(esNovo);
    autoafd.estados.push(novoDe);

    //montando as transições para o "esNovo"
    for (let simb of simbolos) {
      let novosPara = move(automato, novoDe, simb);
      if (novosPara.length != 0) {
        let novoPara = unificaEstados(novosPara);
        //a condição evita transições não definidas
        autoafd.transicoes.push({
          de: novoDe.id,
          para: novoPara.id,
          evento: simb
        });
      }
    }

    //checando se o "esNovo" será estado final no AFD
    tinha_es_final = false;
    for (let es of esNovo) {
      if (automato.final.includes(es.id)) {
        tinha_es_final = true;
        break;
      }
    }

    if (tinha_es_final) {
      autoafd.final.push(novoDe.id);
    }
  }

  console.log(JSON.stringify(autoafd));
  return (autoafd);
}

module.exports = afntoAfd;
