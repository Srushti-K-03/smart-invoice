// server/routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// POST - Save invoice
router.post('/save', async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(201).json({ message: 'Invoice saved!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Fetch all invoices (for future dashboard)
router.get('/all', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
