const React = require('react');
const json = require('./example-automaton.json');

const AutomatonForm = React.createClass({
  getInitialState() {
    return { form: '{}' };
  },

  componentWillReceiveProps(next) {
    this.setState({
      form: next.data,
    });
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

    this.props.submit(jsonAut);
  },

  handleChange(event) {
    const json = this.refs.area.value;

    this.props.change(json);
  },

  render() {
    return (
      <form className="form-area">
        <fieldset>
          <legend>Informações do Autômato</legend>
          <label for="json-area">JSON</label>
          <textarea id="json-area" ref="area" value={this.state.form} onChange={this.handleChange}/>
          <input type="button" value="Atualizar" onClick={this.onSubmit}/>
        </fieldset>
      </form>
    );
  },
});

module.exports = AutomatonForm;
