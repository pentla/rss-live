var React = require('react'),
    log = require('loglevel'),
    utils = require('../../utils.js');

var FeedSearchForm = React.createClass({

    handleSubmit: function (e) {
        e.preventDefault();
        var query = this.refs.search.getDOMNode().value.trim();
        log.info("Input query: ", query);
        this.props.handleSearch(query);
        this.refs.search.getDOMNode().value = "";
    },

    render: function() {
        return (
            <form className="feedSearch" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Feed search" ref="search" />
            </form>
        );
    }

});

module.exports = FeedSearchForm;
