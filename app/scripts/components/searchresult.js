var React = require('react'),
    FeedMixin = require('./feedmixin.js'),
    log = require('loglevel');

var SearchResult = React.createClass({

    mixins: [FeedMixin],

    handleAdd: function () {
        if (this.feed.url) {
            log.info('SearchResult adding url:', this.feed.url);
            this.props.handleAddFeed(this.feed.url);
        } else {
            log.warn('Search result does not have feed url:', this.feed);
        }
    },

    render: function() {
        log.debug('SearchResult props:', this.props);
        return (
            <div className='searchResult' >
                <h1>{this.titleLink}</h1>
                <button onClick={this.handleAdd}>Add</button>
                {this.contentSnippet}
            </div>
        );
    }

});

module.exports = SearchResult;
