var React = require('react'),
    log = require('loglevel');

var EntryItem = React.createClass({

    render: function() {
        log.debug('entry item props:', this.props);
        var feed = this.props.feed;
        return (
            <div className="entryItem" >
                <h1>
                    <a dangerouslySetInnerHTML={{__html: feed.title}} href={feed.link} target='_new'/>
                </h1>
                <p dangerouslySetInnerHTML={{__html: feed.contentSnippet}} />
            </div>
        );
    }

});

module.exports = EntryItem;
