/**
 * Created by pdawson on 6/6/16.
 */

"use strict";

module.exports = (NotFound, BadRequest,log) => {
    return (service, model, name) => {
        service.findAllAsync = async () => {
          return model.find().exec()
            .then( results => {
              if(!results || !results.length) throw new NotFound(`${name} document could not be found`);
              return results
            })
         
        };

        service.createAsync = async (body) => {
            log.info('body',body)
          return model.create(body)
            .then(result => {
              if(!result) {
                throw new BadRequest(`${name} document failed to be created`)
              }
              return result;
            })
        };

        service.findByIdAsync = async id =>  {
          return model.findById(id).exec()
            .then(result => {
              if(!result) {
                throw new NotFound(`${name} document with ${id} cannot be found`)
              }
              return result;
            })
        };

        service.updateByIdAsync =  async (id,body) => {
          const opts = {
            new: true
          };
          return model.findByIdAndUpdate(id,body, opts).exec()
            .then(result => {
              if(!result) {
                throw new NotFound(`${name} document with ${id} failed to update`)
              }
              return result
            })
        };

        service.findByQueryAndSaveAsync = async (query, body) => {
          return model.findOne(query)
            .exec()
            .then(document => {
              if(!document) {
                return null
              }
              document.set(body)
              return document
                .save()
                .then(updatedDocument => updatedDocument)
            })
        }

        service.deleteByIdAsync = async id => {
          return model.findByIdAndRemove(id).exec()
            .then(result => {
              if (!result) {
                throw new NotFound(`${name} document with ${id} failed to delete`)
              }
              return 'Successfully Deleted'
            })
        }
    }
};

