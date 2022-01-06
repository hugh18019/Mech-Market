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
})

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;