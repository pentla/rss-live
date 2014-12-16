var React = require('react');

var FeedItem = React.createClass({

    render: function() {
        return (
            <div className="feedItem">
                {this.props.children}
            </div>
        );
    }

});

module.exports = FeedItem;
