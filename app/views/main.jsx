const React = require('react');
const AutomatonForm = require('./automaton-form.jsx');
const OperationForm = require('./operation-form.jsx');
const AutomataViewer = require('./automaton-viewer.jsx');

const operacoes = require('../operations/');

const empty = {
  nome: '',
  estados: [],
  inicial: [],
  final: [],
  transicoes: []
};

const App = React.createClass({
  getInitialState() {
    return { a: empty, b: empty, form: JSON.stringify(empty), active: 'a' };
  },

  onViewerFocus(option) {
    this.setState({
      active: option,
      form: JSON.stringify(this.state[option])
    });
  },

  atualizarAutomato() {
    const option = this.state.active;
    this.setState({ [option]: JSON.parse(this.state.form) });
  },

  atualizarForm(form) {
    this.setState({ form });
  },

  onOperationCall(operacao) {
    const option = this.state.active;
    const copy = Object.assign({}, this.state[option]);

    const novo = operacoes[operacao].reduce((a, fn) => {
      if (fn.length == 2)
        a = fn(a, this.state.b);
      else
        a = fn(a);
      return a;
    }, copy);

    this.setState({
      [option]: novo,
      form: JSON.stringify(novo)
    });
  },

  render() {
    const a = this.state.a;
    const b = this.state.b;

    return (
      <article className='container'>
        <AutomatonForm
          data={this.state.form}
          update={this.atualizarForm}
          confirm={this.atualizarAutomato}/>

        <OperationForm
          data={operacoes}
          action={this.onOperationCall}/>

        <section className='viewers'>
          <AutomataViewer
            data={a}
            active={(this.state.active == 'a')}
            cname='a'
            action={this.onViewerFocus}/>

          <AutomataViewer
            data={b}
            active={(this.state.active == 'b')}
            cname='b'
            action={this.onViewerFocus}/>
        </section>
      </article>
    );
  }
});

module.exports = App;
