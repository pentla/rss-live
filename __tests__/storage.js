jest.dontMock('../app/scripts/storage.js');

describe('storage', function () {
    var storage = require('../app/scripts/storage.js');

    it('gets an item from storage', function () {
        storage.get('sync', 'feedUrls')

    });
}
