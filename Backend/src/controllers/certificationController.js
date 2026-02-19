const Certification = require('../models/Certification');

// Create certification
const createCertification = async (req, res) => {
  try {
    const { title, issuingOrganization, issueDate, credentialId, credentialUrl } = req.body;

    const certification = await Certification.create({
      title,
      issuingOrganization,
      issueDate,
      credentialId,
      credentialUrl
    });

    res.status(201).json(certification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create certification' });
  }
};


// Get all certifications
const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ issueDate: -1 });
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch certifications' });
  }
};


// Delete certification
const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    await certification.deleteOne();

    res.status(200).json({ message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete certification' });
  }
};

// Update certification
const updateCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    Object.assign(certification, req.body);

    const updatedCertification = await certification.save();

    res.status(200).json(updatedCertification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update certification' });
  }
};

module.exports = {
  createCertification,
  getCertifications,
  deleteCertification,
  updateCertification
};
