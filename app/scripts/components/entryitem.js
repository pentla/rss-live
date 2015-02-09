var React = require('react'),
    log = require('loglevel');

var EntryItem = React.createClass({

    getDefaultProps: function() {
        return {
            feed: {
                title: '',
                link: ''
            },
            options: {
                showContentSnippet: true,
                headingButtons: '',
                childElement: ''
            }
        };
    },

    render: function() {
        log.debug('entry item props:', this.props);
        var feed = this.props.children;
        var opts = this.props.options;
        var contentSnippet = <p dangerouslySetInnerHTML={{__html: feed.contentSnippet}} />
        return (
            <div className="entryItem" >
                <h1>
                    <a dangerouslySetInnerHTML={{__html: feed.title}} href={feed.link} target='_new'/>
                    {opts.headingButtons}
                </h1>
                {opts.showContentSnippet ? contentSnippet : ''}
                {opts.childElement}
            </div>
        );
    }

});

module.exports = EntryItem;
