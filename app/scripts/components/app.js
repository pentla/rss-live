var React = require('react'),
    FeedList = require('./feedlist.js'),
    FeedInput = require('./feedinput.js');


// Main entry point into rss live app
var App = React.createClass({

    render: function() {
        return (
            <div className='app'>
                <FeedList />
                <FeedInput />
            </div>
        );
    }

});

module.exports = App;
