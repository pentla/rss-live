var React = require('react'),
    utils = require('../utils.js');

var FeedInput = React.createClass({

    handleSubmit: function (e) {
        e.preventDefault();
        var url = this.refs.url.getDOMNode().value.trim();
        utils.updStorage('sync', 'urls', function (item) {
            item.urls.push(url);
            return item;
        });
        this.refs.url.getDOMNode().value = "";
    },

    render: function() {
        return (
            <form className="feedInput" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Feed url" ref="url" />
            </form>
        );
    }

});

module.exports = FeedInput;
