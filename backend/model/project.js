const mongoose = require('mongoose');
// create an schema
const projectSchema = 
    new mongoose.Schema({
        name:{
            type: String,
            required: true,
            min: 6,
            max: 255 
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        lists: {
            type: [mongoose.Schema.Types.ObjectId],
        }
    });
 
module.exports = mongoose.model('project',projectSchema);