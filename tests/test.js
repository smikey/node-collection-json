import {NodeJsonClient} from './index';

let client = new NodeJsonClient("http://127.0.0.1:3010/api/users");
client.getCollection().then( collection => {
  console.log("COLLECTION1", JSON.stringify(collection.getJson(), null, 2));
  collection.getTemplate().setData('username', 'test1').setData('password', 'test').setData('roles', '3');
  collection.post().then( collection  => {
    console.log("COLLECTION2", JSON.stringify(collection.getJson(), null, 2));
  })
});
