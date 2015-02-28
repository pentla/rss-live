var React = require('react'),
    FeedMixin = require('../../feedmixin.js');

var FeedEntry = React.createClass({

    mixins: [FeedMixin],

    render: function() {
        return (
            <div className="feedEntry" >
                {this.titleLink}
            </div>
        );
    }

});

module.exports = FeedEntry;
