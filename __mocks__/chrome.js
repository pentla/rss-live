
var chrome = {
    storage: {
        sync: {
            get: jest.genMockFn().mockImpl(function (item, fn) {
                fn(['theoatmeal.com', 'xkcd.com']);
            });
        }
    }
};

module.exports = chrome;
