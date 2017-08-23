# node-collection-json
Nodejs tools for easy manipulation of collection+json objects.

h1. Client Usage


h2. Query/Crawl the API

```javascript
import {NodeJsonClient} from 'node-collection-json';

// create client
let client = new NodeJsonClient("http://example-api/example");

// get the collection
client.getCollection().then( collection => {

  // display the data to console
  console.log("Crawl API", JSON.stringify(collection.getJson(), null, 2));

  // follow a link
  collection.getLinkByRel('plants').follow().then( collection => {

    // display the data to console
    console.log("FOLLOW LINK", JSON.stringify(collection.getJson(), null, 2));

  });
}).catch( collection => {

    // display the data to console
    console.log("Crawl ERROR", JSON.stringify(collection.getJson(), null, 2));
});
```

h2.  POST Data to the API

```javascript
import {NodeJsonClient} from 'node-collection-json';

// create client
let client = new NodeJsonClient("http://example-api/api");

// get the collection
client.getCollection().then( collection => {

  // display the data to console
  console.log("Crawl API", JSON.stringify(collection.getJson(), null, 2));

  // follow a link
  collection.getLinkByRel('plants').follow().then( collection => {

    // display the data to console
    console.log("FOLLOW LINK", JSON.stringify(collection.getJson(), null, 2));

    // get the template object and add data
    collection.getTemplate()
      .setData('type', 'fruit')
      .setData('name', 'apple')
      .setData('color', 'red');

    // post the template object to the API
    collection.post().then( collection  => {

      // display the data to console
      console.log("CREATED DATA", JSON.stringify(collection.getJson(), null, 2));
    }).catch( collection => {

        // display the data to console
        console.log("POST ERROR", JSON.stringify(collection.getJson(), null, 2));
    });
  }).catch( collection => {

      // display the data to console
      console.log("Follow Link ERROR", JSON.stringify(collection.getJson(), null, 2));
  });
}).catch( collection => {

    // display the data to console
    console.log("Crawl ERROR", JSON.stringify(collection.getJson(), null, 2));
});
```

h2.  Query/Update the API

```javascript
import {NodeJsonClient} from 'node-collection-json';

// create client
let client = new NodeJsonClient("http://example-api/api");

// get the collection
client.getCollection().then( collection => {

  // display the data to console
  console.log("Crawl API", JSON.stringify(collection.getJson(), null, 2));

  // follow a link
  collection.getLinkByRel('plants').follow().then( collection => {

    // display the data to console
    console.log("FOLLOW LINK", JSON.stringify(collection.getJson(), null, 2));

    // query the server - update "apple" -> "banana"
    collection.getQueryByRel('search').setData('name', 'apple').query().then( collection => {

      // display the data to console
      console.log("QUERY RESULT", JSON.stringify(collection.getJson(), null, 2));

      // import the first item to the template
      let template = collection.getTemplate();
      template.importItem(collection.getFirstItem());

      // update the item
      template.setData('type', 'fruit')
      template.setData('name', 'banana')
      template.setData('color', 'yellow');

      // save the data
      collection.put(collection.getFirstItem().getHref()).then( collection => {

        // display the data to console
        console.log("CREATED DATA", JSON.stringify(collection.getJson(), null, 2));
      }).catch( collection => {

          // display the data to console
          console.log("Update ERROR", JSON.stringify(collection.getJson(), null, 2));
      });
    }).catch( collection => {

        // display the data to console
        console.log("Query ERROR", JSON.stringify(collection.getJson(), null, 2));
    });
  }).catch( collection => {

      // display the data to console
      console.log("Follow Link ERROR", JSON.stringify(collection.getJson(), null, 2));
  });
}).catch( collection => {

    // display the data to console
    console.log("Crawl ERROR", JSON.stringify(collection.getJson(), null, 2));
});
```
h2.  Query/Delete from API

```javascript
import {NodeJsonClient} from 'node-collection-json';

// create client
let client = new NodeJsonClient("http://example-api/api");

// get the collection
client.getCollection().then( collection => {

  // display the data to console
  console.log("Crawl API", JSON.stringify(collection.getJson(), null, 2));

  // follow a link
  collection.getLinkByRel('plants').follow().then( collection => {

    // display the data to console
    console.log("FOLLOW LINK", JSON.stringify(collection.getJson(), null, 2));

    // query the server
    collection.getQueryByRel('search').setData('name', 'banana').query().then( collection => {

      // display the data to console
      console.log("QUERY RESULT", JSON.stringify(collection.getJson(), null, 2));

      // save the data
      collection.delete().then( collection => {

        // display the data to console
        console.log("DELETED DATA", JSON.stringify(collection.getJson(), null, 2));
      }).catch( collection => {

          // display the data to console
          console.log("Update ERROR", JSON.stringify(collection.getJson(), null, 2));
      });
    }).catch( collection => {

        // display the data to console
        console.log("Query ERROR", JSON.stringify(collection.getJson(), null, 2));
    });
  }).catch( collection => {

      // display the data to console
      console.log("Follow Link ERROR", JSON.stringify(collection.getJson(), null, 2));
  });
}).catch( collection => {

    // display the data to console
    console.log("Crawl ERROR", JSON.stringify(collection.getJson(), null, 2));
});
```
