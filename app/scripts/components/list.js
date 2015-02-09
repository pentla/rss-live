var React = require('react'),
    log = require('loglevel');

var List = React.createClass({

    getDefaultProps: function() {
        return {
            children: []
        };
    },

    render: function() {
        log.debug('Data in List:', this.props.children);
        var {childElement: Item, children: data, ...passedProps} = this.props;
        var listItems = data.map(function (itemData, index) {
            log.debug('List item data:', itemData);
            try {
                return (
                    <Item keu={index} {...passedProps} >{itemData}</Item>
                );
            } catch (error) {
                log.warn('List could not make item:', error);
            }
        });

        return (
            <div className='list'>
                {listItems}
            </div>
        );
    }

});

module.exports = List;
