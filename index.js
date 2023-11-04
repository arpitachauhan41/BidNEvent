const connectToMango=require('./database.js');
const express = require('express');

connectToMango();
const app=express()
app.use(express.json())
const port = 5000

app.get('/',(req,res)=>{
  res.send("hello wrold");
})
app.use('/api/vendorauth',require('./routes/vendorauth'))
app.use('/api/customerauth',require('./routes/customerauth'))
app.use('/api/itemdetails',require('./routes/itemdetails'))
 
app.listen(port, () => {
  console.log(`Bidnvent backend listening on http://localhost:${port}`)
})
