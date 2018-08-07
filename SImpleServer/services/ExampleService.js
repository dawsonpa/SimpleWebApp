/**
 * Created by pauldawson on 8/7/17.
 */
"use strict";

module.exports = (Example, restServiceDecorator) => {
  return class {
    constructor() {
      restServiceDecorator(this, Example, 'Example');
      this.urlShort = 'example'
    }

  }
}
