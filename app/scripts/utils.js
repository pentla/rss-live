var R = require('ramda'),
    log = require('loglevel'),
    storage = require('chrome').storage,
    runtime  = require('chrome').runtime;

// Returns true if object is empty
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// Sends a message out and returns a promise with the response to 
// that message
function sendMessage(message) {
    var promise = new Promise(function (resolve, reject) {
        log.debug('Sending message:', message);
        runtime.sendMessage(message, function (response) {
            log.debug('Sent message:', message, 'received response:', response);
            resolve(response);
        });
    });
    return promise;
}

// Returns a promise to an array of findFeed entries
function searchFeeds(query) {
    var queryObj = {type: 'feedSearch', data: query};
    return sendMessage(queryObj);
}

// Gets and object from the storage and returns a promise for the value
// Note: In order to get all data, null must be passed as the getter
var getStorage = R.curry(function (area, getter) {
    var promise = new Promise(function (resolve, reject) {
        storage[area].get(getter, function (item) {
            if (isEmpty(item)) {
                log.warn(area, 'storage cannot find:', getter);
                reject(Error('Cannot find: ', getter, 'in', area));
            } else {
                log.debug(area, 'storage resolving:', item);
                resolve(item);
            }
        });
    });
    return promise;
});

// Sets the storage to setter and returns a promise to signal when finished
var setStorage = R.curry(function (area, setter) {
    var promise = new Promise(function (resolve, reject) {
        storage[area].set(setter, function () {
            log.debug(area, 'storage set:', setter);
            resolve();
        });
    });
    return promise;
});

// Updates the chrome storage at value getter by applying
// fn to the result of getting the getter
// Returns a promise to signal when finished
var updStorage = R.curry(function (area, getter, fn) {
    return getStorage(area, getter)
        .catch(function (error) {
            log.info(getter, 'does not exist in', 
                     area, 'updating anyway');
            return R.assoc(getter, '', {});
        })
        .then(function (item) {
            var result = fn(item[getter])
            return R.assoc(getter, result, {});
        })
        .then(setStorage(area))
        .catch(function (error) {
            log.warn('updStorage:', error);
        });
});

// Adds a storage listener that will run fn on the the changed obj
// if the storage area matches the desired storage area
// Note: The changed obj takes the form:
// {prop: {newValue: newData, oldValue: oldData}}
var addStorageListener = function (area, prop, fn) {
    storage.onChanged.addListener(function (changes, areaName) {
        log.debug(area, 'storage changes:', changes);
        if (areaName === area && prop in changes) {
            fn(changes[prop]);
        }
    });
};

module.exports = {
    isEmpty: isEmpty,
    searchFeeds: searchFeeds,
    getStorage: getStorage,
    setStorage: setStorage,
    updStorage: updStorage,
    addStorageListener: addStorageListener
};
