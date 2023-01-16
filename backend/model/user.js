const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    email:{
    
        type: String,
        required: true,
        min: 6,
        max: 255 
    },
    password: {
     
        type: String,
        required: true,
        max: 1024,
        min: 6    
    
    },
    verified: {
        type: Boolean, 
        default: false
    }
    
    
    });
    
module.exports = mongoose.model('User',userSchema);
