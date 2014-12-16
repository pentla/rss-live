var $ = require("jquery"),
    fjs = require("functional.js");

function getFeedUrls() {
    var defer = $.Deferred();
    chrome.storage.sync.get("urls", function (u) {
        defer.resolve(u.urls);
    });
    return defer.promise();
}

function getLoadAPIUrl() {
    return "https://ajax.googleapis.com/ajax/services/feed/load";
}

function getFeedLoadUrl(feedUrl) {
    return getLoadAPIUrl() + "?v=1.0&q=" + feedUrl;
}

function getFeedJson(feedUrl) {
    console.log(feedUrl);
    var feedLoadUrl = getFeedLoadUrl(feedUrl);
    var json = $.getJSON(feedLoadUrl).promise();
    return json;
}

function setFeedItems(feedJson) {
    var feedUrl = feedJson.responseData.feed.feedUrl;
    var feedData = feedJson.responseData.feed;
    var feedItem = {feedUrl: feedData};
    console.log(feedItem);
    chrome.storage.local.set(feedItem);
}

chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log("Alarm fired");
    if (alarm.name == "feedRefresh") {
        getFeedUrls()
            .then(fjs.map(getFeedJson))
            .then(fjs.map(setFeedItems));
    }
});

chrome.runtime.onInstalled.addListener(function () {
    console.log("Installed");
    console.log("Creating alarm");
    var alarmData = {"delayInMinutes": 0.0, "periodInMinutes": 5.0};
    chrome.alarms.create("feedRefresh", alarmData);
});
