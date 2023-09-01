const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    status: {
        type: String,
        default: "active"
    },
    verified: {
        type: Boolean,
        default: false,
    },
    profilePic: {
        type: String,
        default: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    },
    saved: [
        // Assuming you have a Material schema or model defined with fields like: particulars, description_of_material, order_quantity, rate, purchase_value, etc.
        {
            title: {
                type: String,
                required: true,
                min: 4
            },
            desc: {
                type: String,
                required: true,
                min: 6
            },
            imageUrl: {
                type: String,
                required: true,
            },
            authorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            blogid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Blog"
            },
        }
    ],

}, {
    timestamps: true
})

const User = mongoose.model("users", userSchema);
module.exports = User;