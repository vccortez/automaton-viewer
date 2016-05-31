const React = require('react');
const vis = require('vis');
const classes = require('classnames');
const parse = require('../automata-parser.js');

const AutomataViewer = React.createClass({
  getInitialState() {
    return { automaton: {}, active: false, redraw: false };
  },

  shouldComponentUpdate(nextProps, nextState) {
    const now = nextProps.active;
    const then = this.state.active;

    return (nextState.redraw) || (now !== then);
  },

  componentWillReceiveProps(props) {
    const rendered = JSON.stringify(this.state.automaton);
    const next = JSON.stringify(props.data);

    this.setState({
      automaton: props.data,
      active: props.active,
      redraw: rendered !== next
    });
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextState.redraw == false)
      return;

    const data = nextState.automaton;

    if ('nome' in data == false)
      return;

    const container = this.refs.cnt;

    const groups = {};

    groups.normal = {
      shape: 'circle',
      color: { background: 'white' }
    };

    groups.inicial = {
      shape: 'circle',
      color: { background: 'lightblue' }
    };

    groups.final = {
      shape: 'circle',
      color: { background: 'white' },
      borderWidth: 4
    };


    groups['inicial-final'] = {
      shape: 'circle',
      color: { background: 'lightblue' },
      borderWidth: 4
    };

    const opts = {
      groups,
      nodes: {
        color: {
          highlight: {
            border: 'red',
            background: 'pink'
          }
        }
      },
      edges: {
        color: {
          color: 'blue',
          highlight: 'red'
        }
      }
    };
    const automaton = new vis.Network(container, parse(data), opts);
    automaton.setSize('100%', `${container.clientHeight * 0.98}px`);
  },

  handleClick(e) {
    this.props.action(this.props.cname);
  },

  render() {
    const viewer = classes({
      viewer: true,
      active: this.state.active,
      [this.props.cname]: true
    });

    return (
      <section className={viewer} ref="cnt" onClick={this.handleClick}/>
    );
  }
});

module.exports = AutomataViewer;
