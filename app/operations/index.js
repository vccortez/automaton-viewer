/**
 * Esse arquivo é responsável por exportar todas
 * as operações de autômatos encontradas nessa
 * pasta.
 */
const aces = require('./acessibilidade.js');
const coac = require('./co-acessibilidade.js');
const fnto = require('./funcao-total.js');
const mini = require('./minimizacao.js');
const copa = require('./composicao-paralela.js');
const prod = require('./produto.js');
const afnd = (x) => {
  console.log('Conversão não implementada!');
  return x;
};

module.exports = {
  Acessibilidade: [aces],
  'Co-Acessibilidade': [coac],
  Trim: [aces, coac],
  'Minimização': [afnd, aces, fnto, mini],
  'Função Total': [fnto],
  'Composição Paralela': [copa],
  Produto: [prod],
  'Conversão de AFD para AFN': [afnd]
};
