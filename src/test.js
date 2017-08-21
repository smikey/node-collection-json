import {NodeJsonClient} from './index';

let client = new NodeJsonClient("http://127.0.0.1:3010/api");
client.getCollection().then( collection => {
    console.log("COLLECTION", JSON.stringify(collection, null, 2));
});
