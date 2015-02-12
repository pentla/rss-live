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

    handleAddFeed: function (feedUrl) {
        utils.updStorage('sync', 'feedUrls', function (feedUrls) {
            var updatedFeedUrls;
            if (!feedUrls) {
                updatedFeedUrls = [feedUrl];
            } else if (feedUrls.indexOf(feedUrl) == -1) {
                updatedFeedUrls = feedUrls.concat(feedUrl);
            } else {
                log.warn('Url:', feedUrl, 'already in feedUrls');
                throw new Error('handleAddFeed(): feed url already in feedUrls');
            }
            log.debug('FeedSearchBox updated urls:', updatedFeedUrls);
            return updatedFeedUrls;
        });
    },

    render: function() {
        return (
            <div className='feedSearchBox'>
                <FeedSearchForm handleSearch={this.handleSearch} />
                <List childElement={SearchResult}
                    handleAddFeed={this.handleAddFeed}
                    keyProp={'title'}>
                    {this.state.entries}
                </List>
            </div>
        );
    }

});

module.exports = FeedSearchBox;
