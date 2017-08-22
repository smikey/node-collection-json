import Collection from './Collection';
import Entity from './Entity';
import axios from 'axios';

/**
 * Creates a valid collection+json link object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 *
 */
export default class Link extends Entity
{
  /**
   * The class constructor
   *
   * @param string href The link uri
   * @param string rel The relational element
   */
  constructor(href, rel, render = null)
  {
    super();

    this.setHref(href);
    this.setRel(rel);
    this.setRender(render);
    this.setPrompt('');
  }

  /**
   * Get link object by json data object
   *
   * @todo - finish this
   * @param {Object} json The JSON object
   * @return Link
   */
  static getByObject(json)
  {
    //check the href
    let hrefString = Link.getObjectValueByKey(json, "href");
    if (hrefString === undefined) {
        throw new CollectionError('link.href String undefined');
    }

    //check the rel
    let relString = Link.getObjectValueByKey(json, "rel");
    if (relString === undefined) {
        throw new CollectionError('link.rel String undefined');
    }

    //check the render
    let renderString = Link.getObjectValueByKey(json, "render");

    let link = new Link(hrefString, relString, renderString);

    //check the prompt
    let promptString = Link.getObjectValueByKey(json, "prompt");
    if (promptString !== undefined) {
      link.setPrompt(promptString);
    }

    return link;
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
   * Get the link string
   *
   * @return string
   */
  getPrompt()
  {
    return this.prompt;
  }

  /**
   * Set the link string
   *
   * @param string link The link uri
   * @return Link
   */
  setPrompt(prompt)
  {
    this.prompt = prompt;

    return this;
  }

  /**
   * Get the render string
   *
   * @return string
   */
  getRender()
  {
    return this.render;
  }

  /**
   * Set the render string
   *
   * @param string render The render type string
   * @return Link
   */
  setRender(render)
  {
    this.render = render;

    return this;
  }

  /**
   * Follow a link and return the collection object
   *
   * @return Collection
   */
  follow()
  {
    return new Promise( (resolve, reject) => {
      axios.get(resource).then( (response) => {
        return resolve(Collection.getByObject(response.data));
      }).catch( error => {
        console.log("ERROR", JSON.stringify(error, null, 2));
      })
    });
  }

  /**
   * Get compiled json object
   *
   * @return Object
   */
  getJson()
  {
    let link = {};
    if (this.href) {
      link.href = this.getHref();
    }
    if (this.rel) {
      link.rel = this.getRel();
    }
    if (this.render) {
      link.render = this.getRender();
    }
    if (this.prompt) {
      link.prompt = this.getPrompt();
    }

    return link;
  }
}
