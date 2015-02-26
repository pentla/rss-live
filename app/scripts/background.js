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
    var title = feedJson.feed.title;
    var data = feedJson.feed;
    var feeds = R.assoc(title, data, {});
    utils.setFeeds(feeds);
}

function refreshFeeds() {
    var updateFeeds = R.pPipe(getFeedJson, setFeedItems);
    googleLoadPromise
        .then(utils.getFeedUrls)
        .then(function (feedUrls) {
            R.forEach(updateFeeds, feedUrls['feedUrls']);
        })
        .catch(function (error) {
            if (error.name == 'TypeError') {
                log.debug('refreshFeeds: feedUrls is empty');
            } else {
                throw error;
            }
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
