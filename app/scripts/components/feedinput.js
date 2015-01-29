var React = require('react'),
    log = require('loglevel'),
    utils = require('../utils.js');

var FeedInput = React.createClass({

    handleSubmit: function (e) {
        e.preventDefault();
        var url = this.refs.url.getDOMNode().value.trim();
        log.info("Input url: ", url);
        // Adds url the array of urls in chrome sync storage
        utils.updStorage('sync', 'urls', function (item) {
            item.urls.push(url);
            log.debug("Updated url list:", item);
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
