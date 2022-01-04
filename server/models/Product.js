const mongoose = require('mongoose');
const User = require('./User');

const { Schema } = mongoose;

const productSchema = new Schema ({
    name: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    offerDate: {
        type: Date,
        default: Date.now
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;