import Collection from './Collection';
import axios from 'axios';

/**
 * Class: Client
 *
 * @author S. Fleming <npm@int5.net>
 * @since Mon Aug 14 16:47:09 CEST 2017
 */
export default class Client
{
  /**
   * The API type
   *
   * @return string
   */
  static get API() {
    return "api";
  }

  /**
   * The JSON type
   *
   * @return string
   */
  static get JSON() {
    return "json";
  }

  /**
   * The class constructor
   *
   * @param {mixed} resource The resource url or collection object
   * @param {String} type The type of resource
   */
  constructor(resource, type = Client.API)
  {
    /**
     * The main collection object
     */
    this.collection = null;

    /**
     * The resource address
     */
    this.resource = null;

    switch(type) {
      case Client.JSON:
        this.collection = resource;
        this.resource = this.collection.getHref();
        break;
      default:
      case Client.API:
        this.resource = resource;
        break;
    }
  }

  /**
   * Call the API and get collection object
   *
   * @return Promise
   */
  getCollectionByResource(resource)
  {
    return new Promise( (resolve, reject) => {
      axios.get(resource).then( (response) => {
        return resolve(Collection.getByObject(response.data));
      }).catch( error => {
        return reject(Collection.getByObject(error.response.data));
      });
    });
  }

  /**
   * Get the collection
   *
   * @return Collection
   */
  getCollection()
  {
    if (this.collection === null) {
      return this.getCollectionByResource(this.resource);
    } else {
      return new Promise( (resolve, reject) => {
        resolve(this.collection);
      });
    }
  }
}
