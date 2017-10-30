import Collection from './Collection';
import Data from './Data';
import EntityLinker from './EntityLinker';
import Link from './Link';
import axios from 'axios';

/**
 * Creates a valid collection+json item object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 */
export default class Item extends EntityLinker
{

  /**
   * Get item object by json data object
   *
   * @todo - finish this
   * @param {Object} json The JSON object
   * @return item
   */
  static getByObject(json)
  {
    //check the href
    let hrefString = Item.getObjectValueByKey(json, "href");
    if (hrefString === undefined) {
        throw new CollectionError('item.href String undefined');
    }

    // init the Item object
    let item = new Item(hrefString);

    // check the datas object
    let datasObject = Item.getObjectValueByKey(json, "data");
    if (Item.isArray(datasObject)) {
      for (const dataObject of datasObject) {

        // add the data
        try {
          let data = Data.getByObject(dataObject);
          item.addData(data);
        } catch(error) {
          // skip this data
        }
      }
    }

    // check the links object
    let linksObject = Item.getObjectValueByKey(json, "links");
    if (Item.isArray(linksObject)) {
      for (const linkObject of linksObject) {

        // add the link
        try {
          let link = Link.getByObject(linkObject);
          item.addLink(link);
        } catch(error) {
          // skip this link
        }
      }
    }

    return item;
  }

  /**
   * The class constructor
   *
   * @param string href The href uri
   */
  constructor(href)
  {
    super();

    this.setHref(href);

    /**
     * The data object
     *
     * @var array
     */
    this.data = [];

    /**
     * The items data array
     *
     * @var array
     */
    this.items = [];

    /**
     * The links data array
     *
     * @var array
     */
    this.links = [];
  }

  /**
   * Get the link string
   *
   * @return string
   */
  getHref()
  {
    return this.href;
  }

  /**
   * Set the link string
   *
   * @param string link The link uri
   * @return Link
   */
  setHref(href)
  {
    this.href = href;

    return this;
  }

  /**
   * Add data object to the collection
   *
   * @param object data The data object
   * @see Data
   * @return Collection
   */
  addData(data)
  {
    this.data.push(data);

    return this;
  }

  /**
   * Get array of data strings
   *
   * @return array
   */
  getData()
  {
    return this.data;
  }

  /**
   * Get the data object by name
   *
   * @param {string} name The name of the key to find
   * @return Data
   */
  getDataByName(name)
  {
    for(let data of this.data) {
        if(data.getName() === name) {
            return data;
        }
    }

    return new Data(key);
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
   * Get compiled json object
   *
   * @return Object
   */
  getJson()
  {
    let item = {};
    if (this.href) {
      item.href = this.href;
    }

    // push the data
    if (this.getData().length > 0) {
      item.data = [];
      for (const data of this.getData()) {
        item.data.push(data.getJson());
      }
    }

    // push the links
    if (this.getLinks().length > 0) {
      item.links = [];
      for (const link of this.getLinks()) {
        item.links.push(link.getJson());
      }
    }

    return item;
  }

  /**
   * Get a template object modeled on the data is defined in the object
   *
   * @return Template
   */
  getTemplate()
  {
    let template = new Template();
    template.addData();

    return template;
  }

  /**
   * Get a data value by the name key
   *
   * @param {String} name The name key to search by
   */
  getDataValueByName(name)
  {
    let foundData = null;
    for (const data of this.getData()) {
      if (data.getName() === name) {
        foundData = data.getValue();
      }
    }

    return foundData;
  }

  /**
   * Delete the item from the server
   *
   * @return Promise<Collection>
   */
  delete()
  {
    return new Promise( (resolve, reject) => {
      axios.delete(this.getHref(),{withCredentials}).then( (response) => {
        return resolve(Collection.getByObject(response.data));
      }).catch( error => {
        return resolve(Collection.getByObject(error.response.data));
      })
    });
  }

  /**
   * Follow the href link
   *
   * @return Promise
   */
  follow(params = null)
  {
    return new Promise( (resolve, reject) => {
      let url = this.getHref();
      if (params !== null && params.constructor === Array) {
        url += '?';
        for(let key in params) {
            url += '&' + key + '=' + params[key];
        }
      }
      axios.get(url,{withCredentials}).then( (response) => {
        return resolve(Collection.getByObject(response.data));
      }).catch( error => {
        return reject(Collection.getByObject(error.response.data));
      })
    });
  }
}
