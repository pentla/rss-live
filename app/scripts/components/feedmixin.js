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
        this.feed = this.props.children;
        this.titleLink = this.feed.title && this.feed.link ? 
            <a dangerouslySetInnerHTML={{__html: this.feed.title}} href={this.feed.link} target='_new'/> :
            '';
        this.contentSnippet = this.feed.contentSnippet ?
            <p dangerouslySetInnerHTML={{__html: this.feed.contentSnippet}} /> :
            '';
    }

};

module.exports = FeedMixin;
