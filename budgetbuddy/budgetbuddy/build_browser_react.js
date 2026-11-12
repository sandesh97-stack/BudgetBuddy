const fs = require('fs');
const path = require('path');

const reactCode = fs.readFileSync(path.join(__dirname, 'node_modules/react/cjs/react.production.js'), 'utf8');
const schedulerCode = fs.readFileSync(path.join(__dirname, 'node_modules/scheduler/cjs/scheduler.production.js'), 'utf8');
const reactDomCode = fs.readFileSync(path.join(__dirname, 'node_modules/react-dom/cjs/react-dom.production.js'), 'utf8');
const reactDomClientCode = fs.readFileSync(path.join(__dirname, 'node_modules/react-dom/cjs/react-dom-client.production.js'), 'utf8');

const bundle = `/**
 * BudgetBuddy — Bundled React 19 & ReactDOM for Offline & In-Browser Execution
 */
(function(window) {
  'use strict';
  window.process = window.process || { env: { NODE_ENV: 'production' } };

  const modules = {};
  const cache = {};

  function defineModule(id, fn) {
    modules[id] = fn;
  }

  function req(id) {
    if (cache[id]) return cache[id].exports;
    const module = { exports: {} };
    cache[id] = module;
    if (!modules[id]) throw new Error('Module not found: ' + id);
    modules[id](req, module, module.exports);
    return module.exports;
  }

  defineModule('react', function(require, module, exports) {
    ${reactCode}
  });

  defineModule('scheduler', function(require, module, exports) {
    ${schedulerCode}
  });

  defineModule('react-dom', function(require, module, exports) {
    ${reactDomCode}
  });

  defineModule('react-dom/client', function(require, module, exports) {
    ${reactDomClientCode}
  });

  const React = req('react');
  const ReactDOM = req('react-dom');
  const ReactDOMClient = req('react-dom/client');

  window.React = React;
  window.ReactDOM = Object.assign({}, ReactDOM, ReactDOMClient);

  console.log('⚛️ React ' + window.React.version + ' & ReactDOM initialized successfully in BudgetBuddy.');
})(typeof window !== 'undefined' ? window : this);
`;

const vendorDir = path.join(__dirname, 'js', 'vendor');
if (!fs.existsSync(vendorDir)) {
  fs.mkdirSync(vendorDir, { recursive: true });
}

fs.writeFileSync(path.join(vendorDir, 'react-browser-bundle.js'), bundle, 'utf8');
console.log('Successfully created js/vendor/react-browser-bundle.js');
