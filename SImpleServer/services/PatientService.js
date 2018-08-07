/**
 * Created by pauldawson on 8/7/17.
 */
"use strict";

module.exports = (Patient, restServiceDecorator, NotFound) => {
  return class {
    constructor() {
      restServiceDecorator(this, Patient, 'Patient');
      this.urlShort = 'patient'
    }

    findAll() {
      return Patient
        .find()
        .limit(200)
        .exec()
        .then(results => {
          if(!results || !results.length) throw new NotFound(`${name} documents could not be found`);
          return results
        })
    }

  }
}
