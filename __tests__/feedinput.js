jest.dontMock('../app/scripts/components/feedinput');

describe('FeedInput', function () {
    var React = require('react/addons');
    var utils = require('../app/scripts/utils');
    var FeedInput = require('../app/scripts/components/feedinput');
    var chrome = require('chrome');
    var TestUtils = React.addons.TestUtils;
    var feedInput;

    beforeEach(function () {
        feedInput = TestUtils.renderIntoDocument(
            <FeedInput />
        );
    });

    it('clears the input post submit', function () {
        var input = TestUtils.findRenderedDOMComponentWithTag(feedInput, 'input');
        var node = input.getDOMNode();
        expect(node.value).toEqual(null);

        var testUrl = 'http://feeds.feedburner.com/oatmealfeed';
        node.value = testUrl;

        var form = TestUtils.findRenderedDOMComponentWithTag(feedInput, 'form');
        TestUtils.Simulate.submit(form);
        expect(node.value).toEqual('');
    });

    it('makes the proper call to update chrome storage', function () {
        var input = TestUtils.findRenderedDOMComponentWithTag(feedInput, 'input');
        var node = input.getDOMNode();
        
        node.value = 'http://feeds.feedburner.com/oatmealfeed';
        var form = TestUtils.findRenderedDOMComponentWithTag(feedInput, 'form');
        TestUtils.Simulate.submit(form);
        expect(chrome.storage.sync.get.mock.calls[0][0]).toEqual({urls: ['input']});

    });
});
