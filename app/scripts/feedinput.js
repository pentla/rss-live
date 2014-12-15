var React = require("react");

var FeedInput = React.createClass({

    handleSubmit: function (e) {
        e.preventDefault();
        var url = this.refs.url.getDOMNode().value.trim();
        var urls;
        chrome.storage.sync.get("urls", function (u) {
            if (Object.keys(u).length === 0) {
                urls = [];
            } else {
                urls = u.urls;
            }
            urls.push(url);
            chrome.storage.sync.set({"urls": urls});
        });
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
