const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { Schema } = mongoose;

const orderSchema = new Schema({
    orderDate: {
        type: Date,
        default: Date.now,
        get: ( timestamp ) => dateFormat( timestamp ),
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    status: {
        type: String
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;