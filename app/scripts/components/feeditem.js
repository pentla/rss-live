var React = require('react');

var FeedItem = React.createClass({

    render: function() {
        console.log('feeditem props:', this.props);
        var body = this.props.feed.description ? this.props.feed.description : this.props.feed.contentSnippet;
        return (
            <div className="feedItem" >
                <h1 dangerouslySetInnerHTML={{__html: this.props.feed.title}} />
                <p dangerouslySetInnerHTML={{__html: body}} />
            </div>
        );
    }

});

module.exports = FeedItem;
