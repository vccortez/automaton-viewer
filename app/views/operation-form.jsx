const React = require('react');
const classes = require('classnames');

const OperationForm = React.createClass({
  handleSubmit(e) {
    let operation = this.refs.ops.value;

    this.props.action(operation);
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
          <legend>Operações</legend>

          <label for='op-list'>Operação</label>
          <select id='op-list' ref='ops'>{options}</select>

          <input type='button' value='Aplicar' className={btns} onClick={this.handleSubmit}/>
        </fieldset>
      </form>
    );
  },
});

module.exports = OperationForm;
