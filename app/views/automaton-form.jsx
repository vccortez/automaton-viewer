const React = require('react');
const StateList = require('./state-list.jsx');
const TransitionList = require('./transition-list.jsx');
const classes = require('classnames');

const AutomatonForm = React.createClass({
  enviarAutomato() {
    this.props.confirm();
  },

  atualizarNome() {
    const json = JSON.parse(this.props.data);
    json.nome = this.refs.nome.value;
    this.props.update(JSON.stringify(json));
  },

  adicionarEstado(e) {
    const json = JSON.parse(this.props.data);

    let maxId = 0;

    if (json.estados.length > 0) {
      maxId = json.estados.reduce((p, c) => {
        return Math.max(p, c.id);
      }, maxId);
    }

    const novo = {
      id: maxId + 1,
      nome: e.nome
    };

    json.estados.push(novo);

    if (e.inicial)
      json.inicial.push(novo.id);

    if (e.final)
      json.final.push(novo.id);

    this.props.update(JSON.stringify(json));
  },

  removerEstado(id) {
    const json = JSON.parse(this.props.data);

    json.estados = json.estados.filter(e => e.id != id);
    json.transicoes = json.transicoes.filter(t => t.de != id && t.para != id);

    this.props.update(JSON.stringify(json));
  },

  adicionarTransicao(t) {
    const json = JSON.parse(this.props.data);

    const nova = {
      de: t.de,
      para: t.para,
      evento: t.evento
    };

    json.transicoes.push(nova);

    this.props.update(JSON.stringify(json));
  },

  removerTransicao(id) {
    const json = JSON.parse(this.props.data);

    json.transicoes = json.transicoes.filter((t, i) => i != id);

    this.props.update(JSON.stringify(json));
  },

  render() {
    const automato = JSON.parse(this.props.data);

    const nome = automato.nome;

    const estados = automato.estados.map(e => {
      return {
        id: e.id,
        nome: e.nome,
        inicial: automato.inicial.includes(e.id),
        final: automato.final.includes(e.id)
      };
    });

    const transicoes = automato.transicoes.map((e, i) => {
      return {
        id: i,
        de: estados.find(s => s.id == e.de),
        para: estados.find(s => s.id == e.para),
        evento: e.evento
      };
    });

    const form = classes('form-area', 'pure-form', 'pure-form-stacked');
    const btns = classes('pure-button', 'pure-button-primary');
    const group = classes('pure-control-group');
    const control = classes('pure-controls');

    return (
      <form className={form}>
        <fieldset>

          <legend>Autômato</legend>

          <section className={group}>
            <label for='nome'>Nome</label>
            <input type='text' placeholder='Autômato' id='nome' required autofocus value={nome} onChange={this.atualizarNome} ref='nome'/>
          </section>

          <section className={group}>
            <label>Estados</label>
            <StateList
              data={estados}
              add={this.adicionarEstado}
              remove={this.removerEstado}/>
          </section>

          <section className={group}>
            <label>Transições</label>
            <TransitionList
              data={transicoes}
              datast={estados}
              add={this.adicionarTransicao}
              remove={this.removerTransicao}/>
          </section>

          <section className={control}>
            <input type='button' value='Confirmar' className={btns} onClick={this.enviarAutomato} />
          </section>

        </fieldset>
      </form>
    );
  }
});

module.exports = AutomatonForm;
