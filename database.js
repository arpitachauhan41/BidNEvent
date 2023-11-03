const mongoose = require('mongoose');

const mongourl = "mongodb://localhost:27017/?directConnection=true";
const connectToMongo = ()=>{
    mongoose.connect(mongourl)
    .then(()=>{console.log("DB CONNECTED")})
    .catch((err)=>{console.log("error in DB" , err)})
}

module.exports = connectToMongo;