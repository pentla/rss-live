var React = require('react');

var EntryItem = React.createClass({

    render: function() {
        return (
            <div className="entryItem">
                {this.props.children}
            </div>
        );
    }

});

module.exports = EntryItem;
