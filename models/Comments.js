const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    text: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Comment = mongoose.model("Comments", CommentSchema);

module.exports = Comment;