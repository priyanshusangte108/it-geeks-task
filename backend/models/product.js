const mongoose = require("mongoose")

const productschema = new mongoose.Schema({

    title :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    image :{
        type : String,
        required : true
    },
},
{
    timestamps : true
});

module.exports = mongoose.model("Product",productschema)