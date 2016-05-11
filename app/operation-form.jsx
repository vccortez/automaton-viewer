const React = require('react');

const OperationForm = React.createClass({
  render() {
    return (
      <form className="op-area">
        <fieldset>
          <legend>Operações em Autômatos</legend>
          <label for="op-list">Operação</label>
          <select id="op-list" defaultValue="minimization">
            <option value="minimization">Minimização</option>
            <option value="accessibility">Acessibilidade</option>
            <option value="nfa">Transformação de NFA</option>
          </select>
          <label for="aut-list">Autômato</label>
          <select id="aut-list" defaultValue="a">
            <option value="a">Autômato A</option>
            <option value="b">Autômato B</option>
          </select>
          <input type="button" value="Aplicar"/>
        </fieldset>
      </form>
    );
  },
});

module.exports = OperationForm;
