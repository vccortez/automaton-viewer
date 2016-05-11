const React = require('react');
const json = require('./example-automaton.json');

const AutomatonForm = React.createClass({
  getInitialState() {
    return { value: JSON.stringify(json, null, 2) };
  },

  onSubmit(event) {
    const textarea = this.refs.area;
    let jsonAut;
    try {
      jsonAut = JSON.parse(textarea.value);
    } catch (err) {
      console.error(err);
      return;
    }

    this.props.action(jsonAut);
  },

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  },

  render() {
    return (
      <form className="form-area">
        <fieldset>
          <legend>Informações do Autômato</legend>
          <label for="json-area">JSON</label>
          <textarea id="json-area" ref="area" value={this.state.value} onChange={this.handleChange}/>
          <input type="button" value="Atualizar" onClick={this.onSubmit}/>
        </fieldset>
      </form>
    );
  },
});

module.exports = AutomatonForm;
