var React = require('react'),
    R = require('ramda'),
    log = require('loglevel'),
    EntryItem = require('./entryitem.js');

var EntryList = React.createClass({

    render: function() {
        log.debug('Entries in EntryList:', this.props.entries);
        var entryItems = R.map(function (entry) {
            log.debug(entry);
            return (
                <EntryItem feed={entry} />
            );
        });

        var feedNodes = entryItems(this.props.entries);
        return (
            <div className="entryList">
                {feedNodes}
            </div>
        );
    }

});

module.exports = EntryList;
