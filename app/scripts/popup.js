/** @jsx React.DOM*/
'use strict';

var React = require("react"),
    $ = require("jquery");

$(document).ready(function () {
    React.render(<FeedInput />, document.getElementById("app"));   
});
