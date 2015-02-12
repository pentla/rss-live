var React = require('react'),
    FeedMixin = require('./feedmixin.js'),
    log = require('loglevel');

var SearchResult = React.createClass({

    mixins: [FeedMixin],

    getDefaultProps: function() {
        return {
            options: {
                showContentSnippet: true,
                headingButtons: '',
            }
        };
    },

    render: function() {
        log.debug('SearchResult props:', this.props);
        return (
            <div className='searchResult' >
                <h1>{this.titleLink}</h1>
                {this.contentSnippet}
            </div>
        );
    }

});

module.exports = SearchResult;
