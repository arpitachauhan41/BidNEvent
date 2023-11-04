const mongoose = require('mongoose');
const {Schema} = mongoose;

const itemSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
})

const Item = mongoose.model('Item',itemSchema);
module.exports = Item;
