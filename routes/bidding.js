const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Bid = require('../models/Bid');
const router = express.Router();
const Vendor = require('../models/Vendor');
app.use(bodyParser.json());
router.post('/bidNow', async (req, res) => {
    try {
        const { vendorName, bidAmount, eventId, message } = req.body;
        const vendor = await Vendor.findOne({ name: vendorName });
       if (!vendor) {
            return res.status(404).json({ success: false, error: 'Vendor not found' });
        }
        if (bidAmount > vendor.budget) {
            return res.status(400).json({ success: false, error: 'Bid amount exceeds vendor budget' });
        }
        vendor.budget -= bidAmount;
        const updatedVendor = await vendor.save();
        const newBid = new Bid({ vendorName, bidAmount, eventId, message });
        const savedBid = await newBid.save();
        console.log('Bid saved successfully:', savedBid);
        res.json({ success: true, bid: savedBid, updatedVendor });
    } catch (err) {
        console.log('Error saving bid:', err);
        res.status(500).json({ success: false, error: 'Error saving bid' });
    }
});
//Route2 Get all bids for a specific event
router.get('/bids/:EventId', async (req, res) => {
    try {
        const EventId = req.params.EventId;
        const bids = await Bid.find({ EventId });
        res.status(200).json(bids);
    } catch (err) {
        console.log('Error fetching bids:', err);
        res.status(500).json({ error: 'Error fetching bids' });
    }
});
//Route3 Get all bids for a specific event, sorting so that top-level bids come first
router.get('/bids/:EventId', async (req, res) => {
    try {
        const EventId = req.params.EventId;
        const bids = await Bid.find({ EventId }).sort({ isTopLevel: -1 });
        res.status(200).json(bids);
    } catch (err) {
        console.log('Error fetching bids:', err);
        res.status(500).json({ error: 'Error fetching bids' });
    }
});

module.exports = router;