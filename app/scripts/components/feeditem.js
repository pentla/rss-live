var React = require('react');

var FeedItem = React.createClass({

    render: function() {
        return (
            <div className="feedItem">
                {this.props.feed.title}
            </div>
        );
    }

});

module.exports = FeedItem;
