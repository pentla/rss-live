var React = require('react'),
    R = require('ramda'),
    log = require('loglevel'),
    Feed = require('./feed.js'),
    List = require('../list.js'),
    utils = require('../../utils.js');

var FeedBox = React.createClass({

    getInitialState: function() {
        return {
            feeds: {}
        };
    },

    onStorageChange: function (feeds) {
        log.debug('FeedBox: feeds storage changed:', feeds.newValue);
        this.setState({feeds: feeds.newValue});
    },

    componentDidMount: function() {
        var feedBox = this;
        utils.getFeeds().then(function (feeds) {
            feedBox.setState(feeds);
        });
        utils.addFeedListener(feedBox.onStorageChange);
    },

    render: function() {
        return (
            <div className="feedBox">
                <List childElement={Feed}
                    keyProp={'title'}>
                    {this.state.feeds}
                </List>

            </div>
        );
    }

});

module.exports = FeedBox;
