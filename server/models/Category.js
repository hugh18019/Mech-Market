const mongoose = require('mongoose');

const { Schema } = mongoose;
const Service = require('./Service');
const Product = require('./Product');

const categorySchema = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String
    },
    services: [Service.schema],
    products: [Product.schema]
})

const Category = mongoose.model('ServiceCategory', categorySchema);

module.exports = Category;
