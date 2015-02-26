var log = require('loglevel'),
    storage = require('./storage.js'),
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

function getFeedUrls() {
    log.debug('Getting feed urls');
    return storage.get('sync', 'feedUrls');   
}

function updateFeedUrls(fn) {
    log.debug('Updating feed urls');
    return storage.update('sync', 'feedUrls', fn);
}

function getFeeds() {
    log.debug('Getting feeds');
    return storage.get('local', 'feeds');
}

function setFeeds(feedData) {
    return storage.set('local', {feeds: feedData});
}

function addFeedListener(fn) {
   storage.addListener('local', 'feeds', fn);
}

module.exports = {
    isEmpty: isEmpty,
    searchFeeds: searchFeeds,
    getFeedUrls: getFeedUrls,
    updateFeedUrls: updateFeedUrls,
    getFeeds: getFeeds,
    setFeeds: setFeeds,
    addFeedListener: addFeedListener
};
