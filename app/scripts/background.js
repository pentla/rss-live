var R = require('ramda'),
    log = require('loglevel'),
    utils = require('./utils.js'),
    chrome = require('chrome');

google.load("feeds", "1");


// Sets a promise that resolves then the google feeds load
var googleLoadPromise = new Promise(function (resolve, reject) {
    google.setOnLoadCallback(function () {
        log.debug("Google loaded");
        resolve();
    });
});


function addSyncUrl(url) {
    
}

function searchFeeds(query) {
    return googleLoadPromise.then(function () {
        return executeSearch(query);
    });
}

function executeSearch(query) {
    var promise = new Promise(function (resolve, reject) {
        log.debug('Google feeds querying:', query);
        google.feeds.findFeeds(query, function (result) {
            if (!result.error) {
                log.debug('Feed search results:', result);
                resolve(result);
            } else {
                log.warn('Feed search query failed:', result.error);
                reject(result.error);
            }
        });
    });
    return promise;
}

var getFeedUrls = function () {
    log.debug('Getting feed urls');
    return utils.getStorage('sync', 'feedUrls');   
}

function getFeedJson(feedUrl) {
    log.info('feed url:', feedUrl);
    var promise = new Promise(function (resolve, reject) {
        var feed = new google.feeds.Feed(feedUrl);
        feed.load(function (result) {
            if (!result.error) {
                log.debug('Parse rss feed:', result);
                resolve(result);
            } else {
                log.warn('Failed to parse rss feed:', result.error);
                reject(result.error);
            }
        });
    });
    return promise;
}

function setFeedItems(feedJson) {
    var feedTitle = feedJson.feed.title;
    var feedData = feedJson.feed;
    var feedItem = R.assoc("feeds", R.assoc(feedTitle, feedData, {}), {});
    utils.setStorage('local', feedItem);
}

function refreshFeeds() {
    var updateFeeds = R.pPipe(getFeedJson, setFeedItems);
    googleLoadPromise
        .then(getFeedUrls)
        .then(function (feedUrls) {
            R.forEach(updateFeeds, feedUrls['feedUrls']);
        });
}

chrome.alarms.onAlarm.addListener(function (alarm) {
    log.debug("Alarm fired");
    if (alarm.name == "feedRefresh") {
        refreshFeeds();
    }
});

chrome.runtime.onInstalled.addListener(function () {
    var alarmData = {"delayInMinutes": 0.0, "periodInMinutes": 0.5};
    chrome.alarms.create("feedRefresh", alarmData);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    log.debug('Recieved request:', request, 'from sender:', sender);
    if (request.type == 'feedSearch') {
        searchFeeds(request.data).then(function (searchResult) {
            sendResponse(searchResult);
            log.debug('Sent search results');
        });
    }
    return true;
});
