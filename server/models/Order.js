const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
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