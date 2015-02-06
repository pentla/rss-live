var React = require('react'),
    log = require('loglevel');

var EntryItem = React.createClass({

    render: function() {
        log.debug('entry item props:', this.props);
        var body = this.props.feed.description ? this.props.feed.description : this.props.feed.contentSnippet;
        return (
            <div className="entryItem" >
                <h1 dangerouslySetInnerHTML={{__html: this.props.feed.title}} />
                <p dangerouslySetInnerHTML={{__html: body}} />
            </div>
        );
    }

});

module.exports = EntryItem;
