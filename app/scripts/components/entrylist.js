var React = require('react'),
    R = require('ramda'),
    EntryItem = require('./components/entryitem.js');

var EntryList = React.createClass({

    render: function() {
        var entryItems = R.map(function (entry) {
            console.log(entry);
            return (
                <EntryItem>
                    {entry.title}
                </EntryItem>
            );
        });

        return (
            <div className="entryList">
            </div>
        );
    }

});

module.exports = EntryList;
