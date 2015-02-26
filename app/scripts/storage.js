var log = require('loglevel'),
    storage = require('chrome').storage;

// Returns true if object is empty
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// Gets and object from the storage and returns a promise for the value
// Note: In order to get all data, null must be passed as the getter
var get = function (area, getter) {
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
};

// Sets the storage to setter and returns a promise to signal when finished
var set = function (area, setter) {
    var promise = new Promise(function (resolve, reject) {
        storage[area].set(setter, function () {
            log.debug(area, 'storage set:', setter);
            resolve();
        });
    });
    return promise;
};

// Updates the chrome storage at value getter by applying
// fn to the result of getting the getter
// Returns a promise to signal when finished
var update = function (area, getter, fn) {
    return get(area, getter)
        .catch(function (error) {
            log.debug(getter, 'does not exist in', 
                     area, 'updating anyway');
            return {[getter]: ''};
        })
        .then(function (item) {
            log.debug('Attempting to update', item);
            var result = fn(item[getter]);
            log.debug('Updating', getter, 'to', result);
            return {[getter]: result};
        })
        .then(set(area))
        .catch(function (error) {
            log.warn(area, 'update storage:', error);
        });
};

// Adds a storage listener that will run fn on the the changed obj
// if the storage area matches the desired storage area
// Note: The changed obj takes the form:
// {prop: {newValue: newData, oldValue: oldData}}
var addListener = function (area, prop, fn) {
    storage.onChanged.addListener(function (changes, areaName) {
        log.debug(area, 'storage changes:', changes);
        if (areaName === area && prop in changes) {
            fn(changes[prop]);
        }
    });
};

module.exports = {
    get: get,
    set: set,
    update: update,
    addListener: addListener,
};
