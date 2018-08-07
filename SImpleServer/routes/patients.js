/**
 * @name examples
 * @description This module packages the Example API.
 */
'use strict';

module.exports = (router, PatientService) => {
  const service = new PatientService();
  router.getAsync("/", (req, res,next) => {
    return service.findAllAsync()
      .then(results => {
        return res.send(results);
      })
      .catch(next)
  });

  router.postAsync("/", (req, res,next) => {
    return service.createAsync(req.body)
      .then(result => {
        return res.send(result);
      })
      .catch(next)

  });

  router.getAsync("/:id", (req, res,next) => {
    return service.findByIdAsync(req.params.id)
      .then(result => {
        return res.send(result);
      })
      .catch(next)

  });

  router.putAsync("/:id", (req, res, next) => {
    return service.updateByIdAsync(req.params.id, req.body)
      .then(result => {
        return res.send(result)
      })
      .catch(next)

  });

  router.deleteAsync("/:id", (req, res,next) => {
    return service.deleteByIdAsync(req.params.id)
      .then(result => {
        return res.send(result);
      })
      .catch(next)
  })
};
