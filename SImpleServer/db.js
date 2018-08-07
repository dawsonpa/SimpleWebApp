"use strict";
module.exports = (Mongoose, config, Promise) => {
    const dbConfig = config.get('db');
    Mongoose.set('debug', true);
    Mongoose.promise = Promise;
    return Mongoose.createConnection(dbConfig.uri, dbConfig.options)

  };
