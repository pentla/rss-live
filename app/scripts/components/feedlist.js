var React = require('react'),
    R = require('ramda'),
    log = require('loglevel'),
    FeedItem = require('./feeditem.js'),
    utils = require('../utils.js');

var FeedList = React.createClass({

    render: function() {
        var mapFeedNodes = R.map(function (entry) {
            log.debug('FeedList input feed:', entry);
            return (
                <FeedItem feed={entry} />
            );
        });
        var feedNodes = mapFeedNodes(this.props.entries);
        return (
            <div className="feedList">
                {feedNodes}
            </div>
        );
    }

});

module.exports = FeedList;
