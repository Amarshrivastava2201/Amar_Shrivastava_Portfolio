const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    issuingOrganization: {
      type: String,
      required: true
    },
    issueDate: {
      type: Date,
      required: true
    },
    image: {
       type: String
    },
    credentialId: {
      type: String
    },
    credentialUrl: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certification', certificationSchema);
