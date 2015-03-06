var React = require('react'),
    List = require('../list.js'),
    FeedEntry = require('./entry/feedentry.js'),
    FeedMixin = require('../feedmixin.js');

var Feed = React.createClass({

    mixins: [FeedMixin],

    getInitialState: function() {
        return {
            showEntries: false
        };
    },

    toggleEntries: function (e) {
        e.preventDefault();
        var showEntries = this.state.showEntries ? false : true;
        this.setState({showEntries});
    },

    render: function() {
        var feedEntryList = this.state.showEntries ? (
                <List childElement={FeedEntry}
                    keyProp={'title'}>
                    {this.feed.entries}
                </List>
        ) : '';

        return (
            <div className="feed" >
                <h2 onClick={this.toggleEntries}>
                    <img src={'chrome://favicon/' + this.feed.link}> </img>
                    {this.titleLink}
                </h2>
                <div className='feedActions'></div>
                {feedEntryList}
            </div>
        );
    }

});

module.exports = Feed;
