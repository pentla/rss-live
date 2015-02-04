var React = require('react'),
    log = require('loglevel'),
    utils = require('../utils.js'),
    FeedList = require('./feedlist.js'),
    FeedSearchForm = require('./feedsearchform.js');

var FeedSearchBox = React.createClass({

    getInitialState: function() {
        return {
            entries: []
        };
    },

    handleSearch: function (query) {
        utils.searchFeeds(query).then(function (searchResult) {
            this.setState(searchResults);
        });
    },

    render: function() {
        return (
            <div className='feedSearchBox'>
                <FeedSearchForm handleSearch={this.handleSearch} />
                <FeedList entries={this.state.entries} />
            </div>
        );
    }

});

module.exports = FeedSearchBox;
