var React = require('react'),
    FeedMixin = require('../../feedmixin.js');

var FeedEntry = React.createClass({

    mixins: [FeedMixin],

    render: function() {
        return this.titleLink;
    }

});

module.exports = FeedEntry;
