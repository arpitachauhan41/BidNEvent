const connectToMongo = require("./database.js");
var cors = require("cors");
const express = require('express');
const app = express();
connectToMongo();

const port = 8080;
app.use(cors());
app.use(express.json());

//app.use()
const PORT = 8080;
app.listen(PORT , ()=>{
    console.log(`server connected at port: ${PORT}`);
})