const React = require('react');
const classes = require('classnames');

const OperationForm = React.createClass({
  getInitialState() {
    return {
      operation: null,
      automaton: null
    };
  },

  handleSubmit(e) {
    let operation = this.refs.ops.value;
    let automaton = this.refs.aut.value;

    this.props.action(operation, automaton);
  },

  render() {
    const operacoes = this.props.data;
    const options = Object.keys(operacoes).map((o, i) => {
      return <option key={i} value={o}>{o}</option>;
    });

    const forms = classes('op-area', 'pure-form');
    const btns = classes('pure-button', 'pure-button-primary');

    return (
      <form className={forms}>
        <fieldset>
          <legend>Operações em Autômatos</legend>
          <label for='op-list'>Operação</label>
          <select id='op-list' ref='ops'>{options}</select>
          <label for='aut-list'>Autômato</label>
          <select id='aut-list' ref='aut'>
            <option value='a'>Autômato A</option>
            <option value='b'>Autômato B</option>
          </select>
          <input type='button' value='Aplicar' className={btns} onClick={this.handleSubmit}/>
        </fieldset>
      </form>
    );
  },
});

module.exports = OperationForm;
