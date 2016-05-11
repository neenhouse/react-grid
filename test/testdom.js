module.exports = function(markup) {
  if (typeof document !== 'undefined') {
    return;
  }
  // Import jsdom
  var jsdom = require('jsdom').jsdom;

  // Define global document object
  global.document = jsdom(markup || '');

  global.window = document.defaultView;

  // Use expect() assertions
  global.expect = require('chai').expect;

  // Set navigator type to nodeJS
  global.navigator = {
    userAgent: 'node.js'
  };

  // Add navigator object to global window
  global.window.navigator = global.navigator;

  global.React = require('react');
};
