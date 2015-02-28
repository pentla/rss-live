var React = require('react'),
    List = require('../list.js'),
    FeedEntry = require('./entry/feedentry.js'),
    FeedMixin = require('../feedmixin.js');

var Feed = React.createClass({

    mixins: [FeedMixin],

    render: function() {
        return (
            <div className="feed" >
                <h2>{this.titleLink}</h2>
                <div className='feedActions'></div>
                <List childElement={FeedEntry}
                    keyProp={'title'}>
                    {this.feed.entries}
                </List>
            </div>
        );
    }

});

module.exports = Feed;
