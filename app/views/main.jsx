const React = require('react');
const AutomatonForm = require('./automaton-form.jsx');
const OperationForm = require('./operation-form.jsx');
const AutomataViewer = require('./automaton-viewer.jsx');
const operacoes = require('./operacoes');

const App = React.createClass({
  getInitialState() {
    return {automata: {}, form: {}};
  },

  onViewerFocus(automatonData) {},

  formSubmit(automatonJSON) {
    this.setState({
      automata: {
        a: automatonJSON,
        b: automatonJSON,
      },
    });
  },

  formChange(form) {
    this.setState({form});
  },

  onOperationCall(operacao, option) {
    const copy = Object.assign({}, this.state.automata[option]);

    const novo = operacoes[operacao](copy);

    const other = option === 'a' ? 'b' : 'a';
    this.setState({
      form: JSON.stringify(novo, null, 2),
      automata: {
        [option]: novo,
        [other]: this.state.automata[other]
      }
    });
  },

  render() {
    const a = this.state.automata.a || {};
    const b = this.state.automata.b || {};

    return (
      <article className='container'>
        <AutomatonForm data={this.state.form} submit={this.formSubmit} change={this.formChange}/>
        <OperationForm data={operacoes} action={this.onOperationCall}/>
        <AutomataViewer data={a} cname='a'/>
        <AutomataViewer data={b} cname='b'/>
      </article>
    );
  },
});

module.exports = App;
