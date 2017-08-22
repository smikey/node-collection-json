import Entity from './Entity';
import Data from './Data';
import Link from './Link';

/**
 * Creates a valid collection+json item object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 */
export default class Item extends Entity
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
      this.getData().forEach( (data) => {
        item.data.push(data.getJson());
      });
    }

    // push the links
    if (this.getLinks().length > 0) {
      item.links = [];
      this.getLinks().forEach( (link) => {
        item.links.push(link.getJson());
      });
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
}
