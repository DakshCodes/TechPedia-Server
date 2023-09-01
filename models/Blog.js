const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BlogSchema = new Schema({
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
    category: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
        default: []
    },
}, {timestamps: true})

const Blog = mongoose.model("Blogs",BlogSchema);

module.exports = Blog;