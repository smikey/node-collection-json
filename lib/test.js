"use strict";

var _index = require("./index");

var client = new _index.NodeJsonClient("http://127.0.0.1:3010/api/users");
client.getCollection().then(function (collection) {
  console.log("COLLECTION1", JSON.stringify(collection.getJson(), null, 2));
  collection.getTemplate().setData('username', 'test2').setData('password', 'test').setData('roles', 3);

  collection.post().then(function (collection) {

    console.log("COLLECTION2", JSON.stringify(collection.getJson(), null, 2));

    collection.getTemplate().importItem(collection.getFirstItem());
    collection.getTemplate().setData('username', 'testme');
    collection.getTemplate().setData('roles', '22');
    console.log("COLLECTION3", JSON.stringify(collection.getJson(), null, 2));

    collection.put(collection.getFirstItem().getHref()).then(function (collection) {
      console.log("COLLECTION4", JSON.stringify(collection.getJson(), null, 2));

      // query the server
      collection.getQueryByRel('search').setData('username', 'testme').query().then(function (collection) {
        console.log("COLLECTION5", JSON.stringify(collection.getJson(), null, 2));
      });
    }).catch(function (collection) {
      console.log("ERROR2", JSON.stringify(collection.getJson(), null, 2));
    });
  }).catch(function (collection) {
    console.log("ERROR1", JSON.stringify(collection.getJson(), null, 2));
  });

  // query the server
  collection.getQuery('search').setData('username', 'testme').query().then(function (collection) {
    console.log("COLLECTION5", JSON.stringify(collection.getJson(), null, 2));
  });
});