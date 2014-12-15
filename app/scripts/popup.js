var React = require("react"),
    FeedInput = require("./feedinput.js"),
    $ = require("jquery");

$(document).ready(function () {
    React.render(<FeedInput />, document.getElementById("app"));   
});
