var React = require('react'),
    log = require('loglevel'),
    utils = require('../utils.js'),
    List = require('./list.js'),
    SearchResult = require('./searchresult.js'),
    FeedSearchForm = require('./feedsearchform.js');

var FeedSearchBox = React.createClass({

    getInitialState: function() {
        return {
            entries: []
        };
    },

    handleSearch: function (query) {
        var feedSearchBox = this;
        utils.searchFeeds(query).then(function (searchResult) {
            feedSearchBox.setState(searchResult);
            log.debug('New FeedSearchBox state:', feedSearchBox.state);
        });
    },

    render: function() {
        return (
            <div className='feedSearchBox'>
                <FeedSearchForm handleSearch={this.handleSearch} />
                <List childElement={SearchResult}
                    keyProp={'title'}>
                    {this.state.entries}
                </List>
            </div>
        );
    }

});

module.exports = FeedSearchBox;
