/**
 * Example Model
 */
"use strict";
module.exports = (db, Mongoose) => {
  // Define and return the model in one go.
  const Schema = Mongoose.Schema;

  const PatientSchema = new Schema({
    'Patient Last Name': {
      type: String
    },
    'Patient Address Line1': {
      type: String
    },
    'Patient City': {
      type: String
    },
    'Patient Address Line2': {
      type: String
    },
    'Patient Phone Number': {
      type: Number
    },
    'Patient Cell Number': {
      type: Number
    },
    'Patient Age': {
      type: Number
    },
    'Patient Email': {
      type: String
    },
    'Patient Gender': {
      type: String
    },
    'Demographics PCP Name': {
      type: String
    },
    'BMI': {
      type: String
    },
    'Social Risk Score': {
      type: Number
    },
    'Social Total Score': {
      type: Number
    },


  }, {collection: 'patient', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

  const Patient = db.model('Patient', PatientSchema);

  return Patient;

};
