var R = require('ramda');
var storage = chrome.storage;

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
                reject(Error("Cannot find: ", getter));
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
        .then(function (item) {
            var promise = new Promise(function (resolve, reject) {
                resolve(fn(item));
            });
            return promise;
        })
        .then(setStorage(type));
});

module.exports = {
    isEmpty: isEmpty,
    getStorage: getStorage,
    setStorage: setStorage,
    updStorage: updStorage
};
