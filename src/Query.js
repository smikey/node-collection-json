
import Entity from './Entity';
import Data from './Data';

/**
 * Creates a valid collection+json query object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 */
export default class Query extends Entity
{
  /**
   * Get query object by json data object
   *
   * @todo - finish this
   * @param {Object} json The JSON object
   * @return query
   */
  static getByObject(json)
  {
    //check the href
    let hrefString = Query.getObjectValueByKey(json, "href");
    if (hrefString === undefined) {
        throw new CollectionError('query.href String undefined');
    }

    //check the rel
    let relString = Query.getObjectValueByKey(json, "rel");
    if (relString === undefined) {
        throw new CollectionError('query.rel String undefined');
    }

    //check the prompt
    let promptString = Query.getObjectValueByKey(json, "prompt");

    // init the object
    let query = new Query(hrefString, relString, promptString);

    // check the data object
    let datasObject = Query.getObjectValueByKey(json, "data");
    if (Query.isArray(datasObject)) {
      for (const dataObject of datasObject) {

        // add the data
        try {
          let data = Data.getByObject(dataObject);
          query.addData(data);
        } catch(error) {
          // skip this data
        }
      }
    }

    return query;
  }
  /**
   * The class constructor
   *
   */
  constructor(href, rel, prompt = null)
  {
    super();

    this.setHref(href);
    this.setRel(rel);
    this.setPrompt(prompt);

    /**
     * The data object
     *
     * @var array
     */
    this.data = [];
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
   * Get the rel string
   *
   * @return string
   */
  getRel()
  {
    return this.rel;
  }

  /**
   * Set the rel string
   *
   * @param string rel The rel element
   * @return rel
   */
  setRel(rel)
  {
    this.rel = rel;

    return this;
  }

  /**
   * Get the prompt string
   *
   * @return string
   */
  getPrompt()
  {
    return this.prompt;
  }

  /**
   * Set the prompt string
   *
   * @param string prompt The prompt string
   * @return data
   */
  setPrompt(prompt)
  {
    this.prompt = prompt;

    return this;
  }

  /**
   * Get compiled json object
   *
   * @return Object
   */
  getJson()
  {
    // push the data
    let query = {};
    if (this.href) {
      query.href = this.getHref();
    }
    if (this.rel) {
      query.rel = this.getRel();
    }
    if (this.prompt) {
      query.prompt = this.getPrompt();
    }

    if (this.getData().length > 0) {
      query.data = [];
      this.getData().forEach( (data) => {
        query.data.push(data.getJson());
      });
    }

    return query;
  }
}
