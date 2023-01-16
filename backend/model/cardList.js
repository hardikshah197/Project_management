const mongoose = require('mongoose');
// create an schema
const listSchema = 
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
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        cards: {
            type: [mongoose.Schema.Types.ObjectId],
        }
    });
 
module.exports = mongoose.model('lists',listSchema);