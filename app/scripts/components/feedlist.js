var React = require('react'),
    R = require('ramda'),
    FeedItem = require('./feeditem.js'),
    utils = require('../utils.js');

var FeedList = React.createClass({

    getInitialState: function() {
        return {
            data: {}
        };
    },

    onStorageChange: function (obj) {
        console.log(obj.newValue);
        this.setState({feeds: obj.newValue});
    },

    componentDidMount: function() {
        var feedList = this;
        utils.getStorage('local', 'feeds').then(function (obj) {
            feedList.setState(obj);
        });
        utils.addStorageListener('local', 'feeds', feedList.onStorageChange);
    },

    render: function() {
        var feedNodes = R.mapObj(function (feed) {
            return (
                <FeedItem>
                    {feed}
                </FeedItem>
            );
        });
        return (
            <div className="feedList">
                {feedNodes(this.state.feeds)}
            </div>
        );
    }

});

module.exports = FeedList;
