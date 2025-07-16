const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name :{ 
        type : String,
        require : true ,
        required : true,
    },
    email :{
        type : String,
        require : true ,
        unique : true, 
        trim : true,
        lowercase : true,
    },
    password : {
         type : String,
        require : true ,
        minlength : 6
    },
    role : {
         type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('User', userSchema)