const connectToMongo = require('./database.js');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
connectToMongo();
const app = express();
const port = 5501;
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let vendorDetails = [];
let purchasedPackages = []; // Initialize the array
app.post('/api/itemdetails/EnterDetails', (req, res) => {
  const newVendorDetail = req.body;
  vendorDetails.push(newVendorDetail);
  res.json({ success: true });
});
const bidNowRoute = require('./routes/bidding');
app.use('/api/bidding/bidNow', bidNowRoute);
app.get('/api/vendor/details', (req, res) => {
  res.json({ success: true, data: vendorDetails });
});
app.post('/api/purchase', (req, res) => {
  try {
     const purchaseDetails = req.body;
     console.log(req.body)
    purchasedPackages.push(purchaseDetails);
    notifyVendor(purchaseDetails);
    res.json({ success: true, packageDetails: purchaseDetails });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ success: false, error: 'Failed to process the purchase' });
  }
});
function notifyVendor(packageDetails) {
  handleReceivedPackage(packageDetails);
}
function handleReceivedPackage(receivedPackage) {
  purchasedPackages.push(receivedPackage);
 console.log('Vendor received and saved the package:', receivedPackage);
}
app.post('/api/notifyVendor', (req, res) => {
  const { packageDetails } = req.body;
  console.log(packageDetails)
  vendorNotificationReceived = packageDetails;
  res.json({ success: true, message: 'Vendor notified successfully.' });
});
app.use('/api/vendorauth', require('./routes/vendorauth'));
app.use('/api/customerauth', require('./routes/customerauth'));
app.use('/api/itemdetails', require('./routes/itemdetails'));
app.use('/api/bidding', require('./routes/bidding'));
app.use('/api/bidding', require('./routes/bidding'));
app.use(express.static(path.join(__dirname, 'Frontend')));
app.get('/', (req, res) => {
  console.log('Request received for index.html');
  return res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});
app.get('/VendorSignup', (req, res) => {
  console.log('Request received for VendorSignup.html');
  return res.sendFile(path.join(__dirname, 'Frontend', 'VendorSignup.html'));
});
app.get('/customersignup', (req, res) => {
  console.log('Request received for customerSignup.html');
  return res.sendFile(path.join(__dirname, 'Frontend', 'customersignup.html'));
});
app.get('/vendorbid', (req, res) => {
  console.log('Request received for Vendorbid.html');
   return res.sendFile(path.join(__dirname, 'Frontend', 'vendorbid.html'));
});
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});
app.listen(port, '127.0.0.1', () => {
  console.log(`Bidnvent backend listening on http://127.0.0.1:${port}`);
});
