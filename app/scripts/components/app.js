var React = require('react'),
    FeedSearchBox = require('./search/searchbox.js');


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
