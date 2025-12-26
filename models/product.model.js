const mongoose = require("mongoose")


const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: Number,

    imageUrl:{
        type: String,
        required: true
    },
    category: [{
        type: String,
        required: true
    }],
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inCart:{
        type: Boolean,
        default: false,
        required: true
    },
    inWishlist:{
        type: Boolean,
        default: false,
        required: true
    },
    cartQuantity:{
        type: Number,
        default: 0,
        required: true
    }
})


const product = mongoose.model("product", productSchema)
module.exports = product