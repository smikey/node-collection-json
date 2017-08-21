"use strict";

var _index = require("./index");

var client = new _index.NodeJsonClient("http://127.0.0.1:3010/api");
client.getCollection().then(function (collection) {
    console.log("COLLECTION", JSON.stringify(collection, null, 2));
});