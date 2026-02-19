const Contact = require('../models/Contact');

// Public: Send message
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      message: 'Message sent successfully',
      contact
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// Admin: Get all messages
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

// Admin: Delete message
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await contact.deleteOne();

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message' });
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContact
};
