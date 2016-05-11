const React = require('react');
const AutomatonForm = require('./automaton-form.jsx');
const OperationForm = require('./operation-form.jsx');
const AutomataViewer = require('./automaton-viewer.jsx');

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

  render() {
    return (
      <article className="container">
        <AutomatonForm action={this.onAutomatonSubmit} />
        <OperationForm />
        <AutomataViewer data={this.state.data_a} cname="a"/>
        <AutomataViewer data={this.state.data_b} cname="b"/>
      </article>
    );
  },
});

module.exports = App;
