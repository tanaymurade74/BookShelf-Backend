const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      imageUrl: { type: String },
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },
  discountedAmount: {
    type: Number,
    default: 0,
  },

  deliveryAddress: {
    block: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
  },
  orderDate:{
    type: Date,
    default: Date.now
  }
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
