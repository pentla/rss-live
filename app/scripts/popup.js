var React = require('react'),
    log = require('loglevel'),
    App = require('./components/app.js');

(function () {
    log.enableAll();
    React.render(<App />, document.getElementById('main'));   
})();
