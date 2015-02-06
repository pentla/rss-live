var React = require('react'),
    R = require('ramda'),
    log = require('loglevel'),
    EntryItem = require('./entryitem.js');

var EntryList = React.createClass({

    getDefaultProps: function() {
        return {
            entries: []
        };
    },

    render: function() {
        log.debug('Entries in EntryList:', this.props.entries);
        var {entries, ...other} = this.props;
        var entryItems = R.map(function (entry) {
            log.debug(entry);
            try {
                return (
                    <EntryItem feed={entry} {...other} />
                );
            } catch (error) {
                log.warn('EntryList could not make entry item:', error);
            }
        });

        var feedNodes = entryItems(entries);
        return (
            <div className="entryList">
                {feedNodes}
            </div>
        );
    }

});

module.exports = EntryList;
