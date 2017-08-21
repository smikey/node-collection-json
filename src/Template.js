
import Entity from './Entity';
import Data from './Data';

/**
 * Creates a valid collection+json template object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 */
export default class Template extends Entity
{
  /**
   * Get template object by json data object
   *
   * @param {Object} json The JSON object
   * @return template
   */
  static getByObject(json)
  {
    // init the template object
    let template = new Template();

    // check the datas object
    let datasObject = Template.getObjectValueByKey(json, "data");
    if (Template.isArray(datasObject)) {
      for (const dataObject of datasObject) {

        // add the data
        try {
          let data = Data.getByObject(dataObject);
          template.addData(data);
        } catch(error) {
          // skip this data
        }
      }
    }

    return template;
  }

  /**
   * The class constructor
   *
   */
  constructor()
  {
    super();

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
   * Get compiled json object
   *
   * @return Object
   */
  getJson()
  {
    // push the data
    let template = {};
    template.data = [];
    this.getData().forEach( (data) => {
      template.data.push(data.getJson());
    });

    return template;
  }

  /**
   * Get database friendly Object
   *
   * @return Object
   */
  getDatabaseObject()
  {
    let dbObject = {};
    for (const data of this.getData()) {
      dbObject[data.getName()] = data.getValue();
    }

    return dbObject;
  }
}
