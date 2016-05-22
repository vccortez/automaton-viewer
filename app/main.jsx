const React = require('react');
const AutomatonForm = require('./automaton-form.jsx');
const OperationForm = require('./operation-form.jsx');
const AutomataViewer = require('./automaton-viewer.jsx');
const operacoes = require('./operacoes');

const App = React.createClass({
  getInitialState() {
    return { data_a: {}, data_b: {} };
  },

  onViewerFocus(automatonData) {},

  onAutomatonSubmit(automatonJSON) {
    this.setState({
      data_a: automatonJSON,
      data_b: automatonJSON,
    });
  },

  onOperationCall(operacao, automato) {
    let json;
    if (automato === 'a') {
      json = JSON.stringify(this.state.data_a);
      let newa = operacoes[operacao](JSON.parse(json));
      this.setState({
        data_a: newa,
      });
    } else {
      json = JSON.stringify(this.state.data_b);
      let newb = operacoes[operacao](JSON.parse(json));
      this.setState({
        data_b: newb,
      });
    }
  },

  render() {
    return (
      <article className="container">
        <AutomatonForm action={this.onAutomatonSubmit}/>
        <OperationForm data={operacoes} action={this.onOperationCall}/>
        <AutomataViewer data={this.state.data_a} cname="a"/>
        <AutomataViewer data={this.state.data_b} cname="b"/>
      </article>
    );
  },
});

module.exports = App;
