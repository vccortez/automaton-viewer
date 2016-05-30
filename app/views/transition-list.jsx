const React = require('react');
const Modal = require('react-modal');
const classes = require('classnames');

const TransitionItem = React.createClass({
  kill(id) {
    this.props.remove(id);
  },

  render() {
    const e = this.props.data;

    const btn = classes('pure-button', 'warn-button');
    const icn = classes('fa', 'fa-minus-circle');

    return (
      <tr>
        <td>{e.id}</td>
        <td>{e.de.nome}</td>
        <td>{e.evento}</td>
        <td>{e.para.nome}</td>
        <td>
          <a className={btn} onClick={this.kill.bind(this, e.id)}>
            <i className={icn}/>
          </a>
        </td>
      </tr>
    );
  }
});

const TransitionList = React.createClass({
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
    const de = this.refs.mEstado.value;
    const para = this.refs.mDestino.value;
    const evento = this.refs.mEvento.value;
    this.props.add({ de, para, evento });
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

    const transicoes = this.props.data.map(e => {
      return <TransitionItem data={e} key={e.id} remove={this.remover}/>;
    });

    const estados = this.props.datast.map(e => {
      return <option value={e.id} key={e.id}>{e.nome}</option>
    });

    return (
      <section className={form}>
        <table className={table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Estado</th>
              <th>Evento</th>
              <th>Resultado</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {transicoes}
          </tbody>
        </table>
        <a className={btn} onClick={this.openModal}>
          <i className='fa fa-plus-square'/>
        </a>
        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.closeModal}
          style={customStyle}>
          <form className='pure-form pure-form-stacked'>
            <fieldset>
              <legend>Nova transição</legend>

              <label>Estado</label>
              <select ref='mEstado'>
                {estados}
              </select>

              <label>Evento</label>
              <input type='text' placeholder='evento' ref='mEvento'/>

              <label>Destino</label>
              <select ref='mDestino'>
                {estados}
              </select>

              <input type='button' className='pure-button' value='Adicionar' onClick={this.adicionar}/>
            </fieldset>
          </form>
        </Modal>
      </section>
    );
  }
});

module.exports = TransitionList;
