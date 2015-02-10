var React = require('react'),
    FeedMixin = require('./feedmixin.js'),
    log = require('loglevel');

var EntryItem = React.createClass({

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
        log.debug('entry item props:', this.props);
        var opts = this.props.options;
        return (
            <div className="entryItem" >
                <h1>
                    {this.titleLink}
                    {opts.headingButtons}
                </h1>
                {this.contentSnippet}
            </div>
        );
    }

});

module.exports = EntryItem;
