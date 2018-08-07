/**
* Example Model
 */
"use strict";
module.exports = (db, Mongoose) => {
  // Define and return the model in one go.
  const Schema = Mongoose.Schema;

  const ExampleSchema = new Schema({
      name: {
        type: String
      }
  }, {collection: 'example', timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

  const Example = db.model('Example', ExampleSchema);

  return Example;

};
