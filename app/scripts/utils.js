var R = require('ramda');
var log = require('loglevel');
var storage = require('chrome').storage;

// Returns true if object is empty
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// Gets and object from the storage and returns a promise for the value
// Note: In order to get all data, null must be passed as the getter
var getStorage = R.curry(function (type, getter) {
    var promise = new Promise(function (resolve, reject) {
        storage[type].get(getter, function (item) {
            if (isEmpty(item)) {
                log.error(type, 'storage cannot find:', getter);
                reject(Error('Cannot find: ', getter));
            } else {
                resolve(item);
            }
        });
    });
    return promise;
});

// Sets the storage to setter and returns a promise to signal when finished
var setStorage = R.curry(function (type, setter) {
    var promise = new Promise(function (resolve, reject) {
        storage[type].set(setter, function () {
            log.debug(type, 'storage set:', setter);
            resolve();
        });
    });
    return promise;
});

// Updates the chrome storage at value getter by applying
// fn to the result of getting the getter
// Returns a promise to signal when finished
var updStorage = R.curry(function (type, getter, fn) {
    return getStorage(type, getter)
        .then(fn)
        .then(setStorage(type));
});

// Adds a storage listener that will run fn on the the changed obj
// if the storage type matches the desired storage area
// Note: The changed obj takes the form:
// {prop: {newValue: newData, oldValue: oldData}}
var addStorageListener = function (type, prop, fn) {
    storage.onChanged.addListener(function (changes, areaName) {
        log.debug(type, 'storage changes:', changes);
        if (areaName === type && prop in changes) {
            fn(changes[prop]);
        }
    });
};

module.exports = {
    isEmpty: isEmpty,
    getStorage: getStorage,
    setStorage: setStorage,
    updStorage: updStorage,
    addStorageListener: addStorageListener
};
