const React = require('react');
const Modal = require('react-modal');
const classes = require('classnames');

const StateItem = React.createClass({
  kill(id) {
    this.props.remove(id);
  },

  render() {
    const e = this.props.estado;

    const btn = classes('pure-button', 'warn-button');
    const icn = classes('fa', 'fa-minus-circle');

    return (
      <tr>
        <td>{e.id}</td>
        <td>{e.nome}</td>
        <td>{e.inicial ? 'Sim' : 'Não'}</td>
        <td>{e.final ? 'Sim' : 'Não'}</td>
        <td>
          <a className={btn} onClick={this.kill.bind(this, e.id)}>
            <i className={icn}/>
          </a>
        </td>
      </tr>
    );
  }
});

const StateList = React.createClass({
  getInitialState() {
    return { modal: false };
  },

  openModal() {
    this.setState({ modal: true });
  },

  closeModal() {
    this.setState({ modal: false });
  },

  adicionar() {
    const nome = this.refs.mNome.value;
    const inicial = this.refs.mIni.checked;
    const final = this.refs.mFin.checked;
    this.props.add({ nome, inicial, final });
    this.closeModal();
  },

  remover(id) {
    this.props.remove(id);
  },

  render() {
    const form = classes('pure-form', 'center');
    const table = classes('pure-table', 'pure-table-horizontal', 'table-center');
    const btn = classes('pure-button');
    const customStyle = {
      content: {
        top: '40%',
        bottom: 'auto',
        left: '50%',
        right: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    const estados = this.props.data.map(e => {
      return <StateItem estado={e} key={e.id} remove={this.remover}/>;
    });

    return (
      <section className={form}>
        <table className={table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Inicial</th>
              <th>Final</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {estados}
          </tbody>
        </table>
        <a className={btn} onClick={this.openModal}>
          <i className='fa fa-plus-square'/>
        </a>
        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.closeModal}
          style={customStyle}
        >
          <form className='pure-form pure-form-stacked'>
            <fieldset>
              <legend>Novo estado</legend>

              <label>Nome</label>
              <input type='text' placeholder='nome do estado' ref='mNome'/>

              <label for='inicial' className='pure-checkbox'>
                <input type='checkbox' id='inicial' ref='mIni'/> Inicial
              </label>

              <label for='final' className='pure-checkbox'>
                <input type='checkbox' id='final' ref='mFin'/> Final
              </label>
              <input type='button' className='pure-button' value='Adicionar' onClick={this.adicionar}/>
            </fieldset>
          </form>
        </Modal>
      </section>
    );
  }
});

module.exports = StateList;
