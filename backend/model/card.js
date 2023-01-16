const mongoose = require('mongoose');
// create an schema
const cardSchema = 
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
            required: true
        },
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    });
 
module.exports = mongoose.model('cards',cardSchema);