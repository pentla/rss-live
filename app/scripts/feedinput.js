/**
 * @jsx React.DOM
 */

var React = require("react");

var FeedInput = React.createClass({

    handleEnter: function () {
        chrome.storage.sync.get("feeds", function (items) {
            console.log(items);
        });
    },

    render: function() {
        return (
            <div className="feedInput">
                <input type="text" value="url" />
            </div>
        );
    }

});

module.exports = FeedInput;
