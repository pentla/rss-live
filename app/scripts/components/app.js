var React = require('react'),
    utils = require('../utils.js'),
    Navbar = require('./navbar.js'),
    FeedSearchBox = require('./search/searchbox.js'),
    FeedBox = require('./feed/feedbox.js');


// Main entry point into rss live app
var App = React.createClass({

    getInitialState: function() {
        return {
            view: 'FeedBox'
        };
    },

    toggleSearch: function () {
        if (this.state.view == 'FeedBox') {
            this.setState({view: 'FeedSearchBox'});
        } else {
            this.setState({view: 'FeedBox'});
        }
    },

    render: function() {
        var view;
        switch (this.state.view) {
            case 'FeedBox' : view = <FeedBox />; break;
            case 'FeedSearchBox': view = <FeedSearchBox />; break;
        }

        return (
            <div className='app'>
                <Navbar 
                    handleRefreshFeeds={utils.refreshFeeds}
                    handleAddFeeds={this.toggleSearch}/>
                {view}
            </div>
        );
    }

});

module.exports = App;
