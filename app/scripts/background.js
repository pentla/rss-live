var R = require('ramda'),
    utils = require('./utils.js');

google.load("feeds", "1");

// Sets a promise that resolves then the google feeds load
var googleLoadPromise = new Promise(function (resolve, reject) {
    google.setOnLoadCallback(function () {
        console.log("Google loaded");
        resolve();
    });
});

var getFeedUrls = utils.getStorage('sync', 'urls');

function addSyncUrl(url) {
    
}

function getFeedJson(feedUrl) {
    console.log(feedUrl);
    var promise = new Promise(function (resolve, reject) {
        var feed = new google.feeds.Feed(feedUrl);
        feed.load(function (result) {
            if (!result.error) {
                resolve(result);
            } else {
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
    console.log(feedItem);
    chrome.storage.local.set(feedItem);
}

function refreshFeeds() {
    getAndSet = R.pPipe(getFeedJson, setFeedItems);
    googleLoadPromise
        .then(getFeedUrls)
        .then(function (urls) {
            R.forEach(getAndSet, urls);
        });
}

chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log("Alarm fired");
    if (alarm.name == "feedRefresh") {
        refreshFeeds();
    }
});

chrome.runtime.onInstalled.addListener(function () {
    var alarmData = {"delayInMinutes": 0.0, "periodInMinutes": 15.0};
    chrome.alarms.create("feedRefresh", alarmData);
});
