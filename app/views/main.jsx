const React = require('react');
const AutomatonForm = require('./automaton-form.jsx');
const OperationForm = require('./operation-form.jsx');
const AutomataViewer = require('./automaton-viewer.jsx');

const operacoes = require('../operations/');

const App = React.createClass({
  getInitialState() {
    return { a: {}, b: {}, form: {}, active: 'a' };
  },

  onViewerFocus(option) {
    this.setState({
      active: option,
      form: JSON.stringify(this.state[option], null, 2)
    });
  },

  formSubmit(automaton) {
    const option = this.state.active;

    this.setState({ [option]: automaton });
  },

  formChange(form) {
    this.setState({ form });
  },

  onOperationCall(operacao, option) {
    const copy = Object.assign({}, this.state[option]);

    const novo = operacoes[operacao].reduce((a, fn) => {
      a = fn(a);
      return a;
    }, copy);

    this.setState({
      [option]: novo,
      active: option,
      form: JSON.stringify(this.state[option], null, 2)
    });
  },

  render() {
    const a = this.state.a;
    const b = this.state.b;

    return (
      <article className='container'>
        <AutomatonForm data={this.state.form} submit={this.formSubmit} change={this.formChange}/>
        <OperationForm data={operacoes} action={this.onOperationCall}/>
        <AutomataViewer data={a} active={(this.state.active == 'a')} cname='a' action={this.onViewerFocus}/>
        <AutomataViewer data={b} active={(this.state.active == 'b')} cname='b' action={this.onViewerFocus}/>
      </article>
    );
  }
});

module.exports = App;
