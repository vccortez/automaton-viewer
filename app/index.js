const React = require('react');
const DOM = require('react-dom');
const Main = require('./views/main.jsx');

DOM.render(
  React.createElement(Main, null),
  document.getElementById('app')
);
