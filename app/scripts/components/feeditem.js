var React = require('react');

var FeedItem = React.createClass({

    render: function() {
        console.log('feeditem props:', this.props);
        return (
            <div className="feedItem" dangerouslySetInnerHTML={{__html: this.props.feed.title}} />
        );
    }

});

module.exports = FeedItem;
