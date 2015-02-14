var React = require('react'),
    FeedSearchBox = require('./search/searchbox.js')
    FeedBox = require('./feed/feedbox.js');


// Main entry point into rss live app
var App = React.createClass({

    render: function() {
        return (
            <div className='app'>
                <FeedSearchBox />
                <FeedBox />
            </div>
        );
    }

});

module.exports = App;
