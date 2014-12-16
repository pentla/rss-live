var React = require("react"),
    FeedInput = require("./components/feedinput.js"),
    $ = require("jquery");

$(document).ready(function () {
    React.render(<FeedInput />, document.getElementById("app"));   
});
