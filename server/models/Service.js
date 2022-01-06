const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema ({
    name: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    date: {
        type: Date,
        default: Date.now
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;