var React = require('react'),
    utils = require('../utils.js');

var Navbar = React.createClass({

    handleRefreshFeeds: function () {
        this.props.handleRefreshFeeds();
    },

    handleAddFeeds: function () {
        this.props.handleAddFeeds();
    },

    render: function() {
        return (
            <nav className='navbar'>
                <a title='Refresh feeds' onClick={this.handleRefreshFeeds}>R </a>
                <a title='Add a new feed' onClick={this.handleAddFeeds}>A </a>
            </nav>
        );
    }

});

module.exports = Navbar;
