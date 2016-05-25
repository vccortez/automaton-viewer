const React = require('react');
const AutomatonForm = require('./automaton-form.jsx');
const OperationForm = require('./operation-form.jsx');
const AutomataViewer = require('./automaton-viewer.jsx');
const operacoes = require('./operacoes');

const App = React.createClass({
  getInitialState() {
    return { automata: {}, form: {} };
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
    this.setState({ form });
  },

  onOperationCall(operacao, automato) {
    let json;
    if (automato === 'a') {
      json = JSON.stringify(this.state.automata.a);
      let newa = operacoes[operacao](JSON.parse(json));
      this.setState({
        form: JSON.stringify(newa, null, 2),
        automata: {
          b: this.state.automata.b,
          a: newa,
        },
      });
    } else {
      json = JSON.stringify(this.state.automata.b);
      let newb = operacoes[operacao](JSON.parse(json));
      this.setState({
        form: JSON.stringify(newb, null, 2),
        automata: {
          a: this.state.automata.a,
          b: newb,
        },
      });
    }
  },

  render() {
    const a = this.state.automata.a || {};
    const b = this.state.automata.a || {};

    return (
      <article className="container">
        <AutomatonForm data={this.state.form} submit={this.formSubmit} change={this.formChange}/>
        <OperationForm data={operacoes} action={this.onOperationCall}/>
        <AutomataViewer data={a} cname="a"/>
        <AutomataViewer data={b} cname="b"/>
      </article>
    );
  },
});

module.exports = App;
