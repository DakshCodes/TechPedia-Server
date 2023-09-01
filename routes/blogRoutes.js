const router = require('express').Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Blog = require('../models/Blog');
const Comment = require('../models/Comments');
const User = require('../models/userModel');

//add a new product

router.post("/add-blog", async (req, res) => {
    try {
        const data = await req.body;
        const newBlog = new Blog(data)
        await newBlog.save();
        res.status(200).json({
            status: true,
            newBlog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

//get all products

router.get("/getblog/:id", async (req, res) => {
    try {
        // console.log(req)
        const id = req.params.id;
        const blog = await Blog.findById(id).populate("authorId").select('-password')
        res.status(200).json({
            succes: true,
            blog
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})
router.put("/:id/like", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);

        if (blog.likes.includes(req.body.userId)) {
            blog.likes = blog.likes.filter((id) => id.toString() !== req.body.userId.toString());
        } else {
            blog.likes.push(req.body.userId);
        }

        await blog.save();

        res.status(200).json({
            success: true,
            message: "Like updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

//get my products

router.get("/getmyblog", authMiddleware, async (req, res) => {
    try {
        // console.log(req.body.userId)
        const blog = await Blog.find({ authorId: req.body.userId })
        console.log(blog)
        res.status(200).json({
            succes: true,
            blog
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})
//get all products

router.get("/get-allblogs", async (req, res) => {
    try {
        const Blogs = await Blog.find({});
        res.send({
            success: true,
            data: Blogs,
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get("/getmysaved", authMiddleware, async (req, res) => {
    try {
        const user = await User.find({});
        res.send({
            success: true,
            data: user,
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})
router.post("/comment", async (req, res) => {
    try {
        const body = req.body; // req.body is already parsed by the body parser middleware

        let newComment = await Comment.create(body)
        newComment = await newComment.populate('authorId')

        // Respond with success or other data
        res.send({
            success: true,
            comment: newComment
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});
router.post("/saved", authMiddleware, async (req, res) => {
    try {
        const body = req.body; // req.body is already parsed by the body parser middleware

        const user = await User.findByIdAndUpdate(req.body.userId, {
            $push: { saved: body }
        }, { new: true });

        // Respond with success or other data
        res.send({
            success: true,
            user: user
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});
router.get("/:id/comment", async (req, res) => {
    try {
        const id = req.params.id;
        // req.body is already parsed by the body parser middleware

        const comments = await Comment.find({ blogId: id }).populate('authorId')

        // Respond with success or other data
        res.send({
            success: true,
            comment: comments
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});
//delete a supplier

// router.delete("/delete-blog/:id", authMiddleware, async (req, res) => {
//     try {

//         await Type.findByIdAndDelete(req.params.id);
//         res.send({
//             success: true,
//             message: "Types Deleted successfully",
//         });

//     } catch (error) {
//         res.send({
//             success: false,
//             message: error.message
//         });
//     }
// })

// edit a supplier

// router.put("/edit-blog/:id", authMiddleware, async (req, res) => {
//     try {

//         await Type.findByIdAndUpdate(req.params.id, req.body);
//         res.send({
//             success: true,
//             message: "Types Updated successfully",
//         });

//     } catch (error) {
//         res.send({
//             success: false,
//             message: error.message
//         });
//     }
// });

module.exports = router;