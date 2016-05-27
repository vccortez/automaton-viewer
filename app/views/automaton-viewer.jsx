const React = require('react');
const vis = require('vis');
const cls = require('classnames');
const parse = require('../automata-parser.js');

const AutomataViewer = React.createClass({
  getInitialState() {
    return { data: {} };
  },

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.state.data) !== JSON.stringify(nextState.data);
  },

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  },

  componentWillUpdate(nextProps, nextState) {
    const data = nextState.data;

    if ('nome' in data == false)
      return;

    const container = this.refs.container;

    const groups = {};

    groups.normal = {
      shape: 'circle',
      color: { background: 'white' }
    };

    groups.inicial = Object.assign({}, groups.normal);
    groups.inicial.color = { background: '#add8e6' };

    groups.final = Object.assign({}, groups.normal);
    groups.final.borderWidth = 4;

    groups['inicial-final'] = Object.assign({}, groups.inicial);
    groups['inicial-final'] = Object.assign(groups['inicial-final'], groups.final);

    const opts = {
      groups,
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

  render() {
    const classes = { aut: true };
    classes[this.props.cname] = true;

    return (
      <section className={cls(classes)} ref="container"/>
    );
  }
});

module.exports = AutomataViewer;
