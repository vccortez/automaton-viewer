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
    //console.log('AutomataViewer will receive', nextProps);
    this.setState(nextProps);
  },

  componentWillUpdate(nextProps, nextState) {
    //console.log('AutomataViewer will update', nextState);

    const data = nextState.data;

    if ('nome' in data == false)
      return;

    const container = this.refs.container;

    const opts = {
      groups: {
        inicial: { color: { background: '#add8e6' } },
        final: { color: { background: 'white' }, borderWidth: 4 },
        'inicial-final': { color: { background: '#add8e6' }, borderWidth: 4 },
        normal: { color: { background: 'white' } },
      },
      nodes: {
        shape: 'circle',
      },
    };
    //console.log('should be rendering the automaton');
    const automaton = new vis.Network(container, parse(data), opts);
    //automaton.canvas.options.height = automaton.canvas.frame.clientHeight;
    automaton.setSize('100%', `${container.clientHeight * 0.98}px`);
  },

  render() {
    const classes = { aut: true };
    classes[this.props.cname] = true;

    return (
      <section className={cls(classes)} ref="container"/>
    );
  },
});

module.exports = AutomataViewer;
