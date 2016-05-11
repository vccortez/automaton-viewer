const React = require('react');
const DOM = require('react-dom');
const Main = require('./main.jsx');
require('./style.css');

DOM.render(React.createElement(Main, null), document.getElementById('app'));
