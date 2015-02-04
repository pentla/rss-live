var React = require('react'),
    log = require('loglevel'),
    utils = require('../utils.js'),
    FeedList = require('./feedlist.js'),
    FeedSearchForm = require('./feedsearchform');

var FeedSearchBox = React.createClass({

    getInitialState: function() {
        return {
            entries: []
        };
    },

    handleSearch: function (query) {
        var feedSearchBox = this;
        var promise = utils.searchFeeds(query);
        promise.then(function (searchResult) {
            log.info('handleSearch feed search results:', searchResult);
            feedSearchBox.setState(searchResult);
            log.debug('New searchBox state:', feedSearchBox.state);
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
