const mongoose = require("mongoose");


const addressSchema = mongoose.Schema({
    block: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    }

})


const address = mongoose.model("address", addressSchema)

module.exports = address;