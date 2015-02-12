var React = require('react'),
    log = require('loglevel');

var List = React.createClass({

    getDefaultProps: function() {
        return {
            children: [],
            keyProp: ''
        };
    },

    render: function() {
        log.debug('Data in List:', this.props.children);
        var {childElement: Item, children: data, keyProp, ...passedProps} = this.props;
        var listItems = data.map(function (itemData, index) {
            log.debug('List item', index,' data:', itemData);
            var key;
            if (itemData[keyProp]) {
                key = itemData[keyProp];
                log.debug('Item key set to:', key);
            } else {
                key = index;
                log.warn('Item key not set; using index for key');
            }
            try {
                return (
                    <Item key={key} {...passedProps} >{itemData}</Item>
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
