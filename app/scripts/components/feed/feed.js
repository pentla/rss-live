var React = require('react'),
    FeedMixin = require('../feedmixin.js');

var Feed = React.createClass({

    mixins: [FeedMixin],

    render: function() {
        return (
            <div className="feed" >
                <h2>{this.titleLink}</h2>
                <div className='feedActions'></div>
            </div>
        );
    }

});

module.exports = Feed;
