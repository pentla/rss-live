var React = require('react'),
    FeedSearchBox = require('./feedsearchbox.js'),
    FeedList = require('./feedlist.js'),
    FeedInput = require('./feedinput.js');


// Main entry point into rss live app
var App = React.createClass({

    render: function() {
        return (
            <div className='app'>
                <FeedSearchBox />
            </div>
        );
    }

});

module.exports = App;
