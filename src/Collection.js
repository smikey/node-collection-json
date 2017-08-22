import CollectionError from './CollectionError';
import Entity from './Entity';
import Error from './Error';
import Item from './Item';
import Link from './Link';
import Query from './Query';
import Template from './Template';
import axios from 'axios';

/**
 * Creates and validates collection+json object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 */
export default class Collection extends Entity
{
  /**
   * Get the collection version
   *
   * @return string
   */
  static get VERSION() {
    return "1.0";
  }

  /**
   * parse data request in template form into a database friendly json object
   *
   * @param {Object} json The JSON object to parse (should be in Collection+JSON Template form)
   * @return Object
   */
  static parseTemplate(json)
  {
    let dbObject = {};

    //check the template object
    let templateObject = Collection.getObjectValueByKey(json, "template");
    if (templateObject !== undefined) {
      let template = Template.getByObject(templateObject);
      dbObject = template.getDatabaseObject();
    }
    return dbObject;
  }

  /**
   * Import a collection string and transform into a collection object
   *
   * @param String collection - The string to import
   * @return Collection
   */
  static getByObject(json)
  {
  //check the collection object
  let collectionObject = Collection.getObjectValueByKey(json, "collection");
    if (collectionObject === undefined) {
        //throw new CollectionError('collection Object undefined');
    }

    //check the version
    let versionString = Collection.getObjectValueByKey(collectionObject, "version");
    if (versionString === undefined) {
        //throw new CollectionError('collection.version String undefined');
    }

    //check the href
    let hrefString = Collection.getObjectValueByKey(collectionObject, "href");
    if (hrefString === undefined) {
        //throw new CollectionError('collection.href String undefined');
    }

    // create the collection object
    let collection = new Collection(hrefString);

    // check the links object
    let linksObject = Collection.getObjectValueByKey(collectionObject, "links");
    if (Collection.isArray(linksObject)) {
      for (const linkObject of linksObject) {

        // add the link
        try {
          let link = Link.getByObject(linkObject);
          collection.addLink(link);
        } catch(error) {
          // skip this link
        }
      }
    }

    // check the items object
    let itemsObject = Collection.getObjectValueByKey(collectionObject, "items");
    if (Collection.isArray(itemsObject)) {
      for (const itemObject of itemsObject) {

        // add the item
        try {
          let item = Item.getByObject(itemObject);
          collection.addItem(item);
        } catch(error) {
          // skip this item
        }
      }
    }

    // check the querys object
    let queriesObject = Collection.getObjectValueByKey(collectionObject, "queries");
    if (Collection.isArray(queriesObject)) {
      for (const queryObject of queriesObject) {

        // add the query
        try {
          let query = Query.getByObject(queryObject);
          collection.addQuery(query);
        } catch(error) {
          console.log(error.message);
        }
      }
    }

    //check the template object
    let templateObject = Collection.getObjectValueByKey(collectionObject, "template");
    if (templateObject !== undefined) {

        // add the template
        try {
          let template = Template.getByObject(templateObject);
          collection.setTemplate(template);
        } catch(error) {
          console.log(error.message);
        }
    }

    //check the error object
    let errorObject = Collection.getObjectValueByKey(collectionObject, "error");
    if (errorObject !== undefined) {

        // add the error
        try {
          let error = Error.getByObject(errorObject);
          collection.setError(error);
        } catch(error) {
          console.log(error.message);
        }
    }

    return collection;
  }

  /**
   * The class constructor
   *
   * @param string url The api root uri
   */
  constructor(uri)
  {
    super();

    /**
     * The api root uri
     *
     * @var string
     */
    this.href = uri;

    /**
     * The api links array
     *
     * @var array
     */
    this.links = [];

    /**
     * The items data array
     *
     * @var array
     */
    this.items = [];

    /**
     * The query method data definition array
     *
     * @var array
     */
    this.queries = [];

    /**
     * The data template definition
     *
     * @var object
     */
    this.template = {};

    /**
     * The error object
     *
     * @var object
     */
    this.error = {};
  }

  /**
   * Get the API uri definition
   *
   * @return string
   */
  getHref()
  {
    return this.href;
  }

  /**
   * Get the colleciton version number
   *
   * @return String
   */
  getVersion()
  {
    return Collection.VERSION;
  }

  /**
   * Add link object to the collection
   *
   * @param object link The link object
   * @see Link
   * @return Collection
   */
  addLink(link)
  {
    this.links.push(link);

    return this;
  }

  /**
   * Get array of link strings
   *
   * @return array
   */
  getLinks()
  {
    return this.links;
  }

  /**
   * Add item object to the collection
   *
   * @param object item The item object
   * @see Item
   * @return Collection
   */
  addItem(item)
  {
    this.items.push(item);

    return this;
  }

  /**
   * Get an item instance
   *
   * @param String url - The item url
   * @return Item
   */
  getItem(url)
  {
    return new Item(url);
  }

  /**
   * Get array of item strings
   *
   * @return array
   */
  getItems()
  {
    return this.items;
  }

  /**
   * Add query object to the collection
   *
   * @param object query The query object
   * @see Query
   * @return Collection
   */
  addQuery(query)
  {
    this.queries.push(query);

    return this;
  }

  /**
   * Get an query instance
   *
   * @param String url - The item url
   * @return Query
   */
  getQuery()
  {
    return new Query();
  }

  /**
   * Get array of query objects
   *
   * @return array
   */
  getQueries()
  {
    return this.queries;
  }

  /**
   * Set the template object
   *
   * @param Template template The template object
   * @see Template
   * @return Collection
   */
  setTemplate(template)
  {
    this.template = template;
  }

  /**
   * Get the template object
   *
   * @return Template
   */
  getTemplate()
  {
    return this.template;
  }

  /**
   * Set the error object
   *
   * @param Error error The error object
   * @see error
   * @return Collection
   */
  setError(error)
  {
    this.error = error;
  }

  /**
   * Get the error object
   *
   * @return error
   */
  getError()
  {
    return this.error;
  }

  /**
   * Get compiled json object
   *
   * @return Object
   */
  getJson()
  {
    // create the collection
    let collection = {};
    collection.version = Collection.VERSION;
    collection.href = this.href;

    // add the links
    if (this.getLinks().length > 0) {
      collection.links = [];
      this.getLinks().forEach( (link) => {
        collection.links.push(link.getJson());
      });
    }

    // add the items
    if (this.getItems().length > 0) {
      collection.items = [];
      this.getItems().forEach( (item) => {
        collection.items.push(item.getJson());
      });
    }

    // add the querys
    if (this.getQueries().length > 0) {
      collection.queries = [];
      this.getQueries().forEach( (query) => {
        collection.queries.push(query.getJson());
      });
    }

    // add template
    if(Object.keys(this.getTemplate()).length > 0 ) {
      collection.template = this.getTemplate().getJson();
    }

    // add error
    if (Object.keys(this.getError()).length > 0) {
      collection.error = this.getError().getJson();
    }

    return {collection};
  }

  /**
   * Post template contents to the server
   *
   * @return Promise
   */
  post()
  {
    return this.dispatch('post');
  }

  /**
   * Put template contents to the server
   *
   * @return Promise
   */
  put()
  {
    return this.dispatch('put');
  }

  /**
   * Send template contents to the server and get new collection
   *
   * @return Promise
   */
  dispatch(method)
  {
    // create the template string
    let templateData = {};
    templateData.template = this.getTemplate().getJson();
    let templateString = JSON.stringify(templateData);

    // dispatch
    switch (method) {
      case 'put':
      case 'post':
        return new Promise( (resolve, reject) => {
          axios({
            method: method,
            url: this.getHref(),
            headers: {'Content-Type': 'application/vnd.collection+json'},
            data: templateString,
          }).then( (response) => {
            return resolve(Collection.getByObject(response.data));
          }).catch ( error => {
            return reject(error);
          });
        });
        break;
      // case 'patch':
      default:
        throw new Error("Method type: " + method + " not found");
    }
  }

}
