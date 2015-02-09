var React = require('react'),
    log = require('loglevel');

var FeedMixin = {

    getDefaultProps: function() {
        return {
            children: {
                title: '',
                link: '',
                contentSnippet: ''
            }
        };
    },

    componentWillMount: function() {
        var feed = this.props.children;
        this.titleLink = feed.title && feed.link ? 
            <a dangerouslySetInnerHTML={{__html: feed.title}} href={feed.link} target='_new'/> :
            '';
        this.contentSnippet = feed.contentSnippet ?
            <p dangerouslySetInnerHTML={{__html: feed.contentSnippet}} /> :
            '';
    }

};

module.exports = FeedMixin;
