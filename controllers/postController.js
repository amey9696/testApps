const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

module.exports.createPost = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (error, fields, files) => {
        // return res.json({ files });
        const { company_name, company_desc, contact, email, company_state, company_city } = fields;
        console.log(company_name, company_desc, contact, email, company_state, company_city)
        const errors = [];

        // we don't use express validator because validator these package pass to req.body buth here data ins present in fields.
        if (company_name === '') {
            errors.push({ msg: "Company Name is required" })
        }
        if (company_desc === '') {
            errors.push({ msg: "Company Description is required" })
        }
        if (contact === '') {
            errors.push({ msg: "Contact is required" })
        }
        if (email === '') {
            errors.push({ msg: "Email is required" })
        }
        if (errors.length !== 0) {
            return res.status(400).json({ errors }); //files means image data
        }
        if (Object.keys(files).length === 0) {
            errors.push({ msg: "Image is required" })
        } else {
            //check image is jpg or png format
            const { mimetype } = files.image;
            const split = mimetype.split('/');
            const extension = split[1].toLowerCase();
            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                error.push({ msg: `${extension} is not valid extension.please use png or jpg format image` })
            } else {
                files.image.originalFilename = uuidv4() + '.' + extension;
            }
        }
        if (errors.length !== 0) {
            return res.status(400).json({ errors, files }); //files means image data
        }
        else {
            const newPath = __dirname + `/../client/public/image/${files.image.originalFilename}` //access absolute path
            fs.copyFile(files.image.filepath, newPath, async (error) => {
                if (!error) {
                    try {
                        const response = await Post.create({
                            company_name,
                            company_desc,
                            contact,
                            email,
                            image: files.image.originalFilename,
                            company_state,
                            company_city
                        });
                        return res.status(200).json({ msg: 'Your post has been created successfully', response })
                    } catch (error) {
                        return res.status(500).json({ errors: error, msg: error.message });
                    }
                }
            });
        }
    });
}

module.exports.fetchPosts = async (req, res) => {
    const page = req.params.page;
    const perPage = 5; //later change value to 5 or 10 i.e how many card display on page 1 on pagination (also change in Pagination.js in frontend in if (diff <=3) here)
    const skip = (page - 1) * perPage;
    try {
        const count = await Post.find().countDocuments();
        const response = await Post.find().skip(skip).limit(perPage).sort({ updatedAt: -1 }); //-1 means in descending order
        return res.status(200).json({ response: response, count, perPage });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
}

module.exports.fetchPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findOne({ _id: id });
        return res.status(200).json({ post });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: error, msg: error.message });
    }
}

module.exports.updateValidations = [
    body('company_name').notEmpty().trim().withMessage('Company Name is required'),
    body('company_desc').notEmpty().trim().withMessage('Company Description is required'),
    body('email').notEmpty().trim().withMessage('Email is required'),
    body('contact').isLength({ min: 10, max: 10 }).withMessage('wrong contact ')
]

module.exports.updatePost = async (req, res) => {
    const { company_name, company_desc, contact, email, id } = req.body;
    console.log(id)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        try {
            const response = await Post.findByIdAndUpdate(id, {
                company_name,
                company_desc,
                contact,
                email,
            });
            return res.status(200).json({ msg: 'Your post has been updated', response });
        } catch (error) {
            return res.status(500).json({ errors: error, msg: error.message });
        }
    }
};

module.exports.deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Post.findByIdAndRemove(id);
        return res.status(200).json({ msg: 'Your post has been deleted' });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
};

// module.exports.postDetails = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const post = await Post.findOne({ slug: id });
//         const comments = await Comment.find({ postId: post._id }).sort({ updatedAt: -1 });
//         return res.status(200).json({ post, comments });
//     } catch (error) {
//         return res.status(500).json({ errors: error, msg: error.message });
//     }
// }

// module.exports.getAllPost = async (req, res) => {
//     try {
//         const post = await Post.find().exec((err, result) => {
//             if (err) {
//                 return res.status(400).json({ err });
//             } else {
//                 return res.status(200).json({ post: result });
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({ errors: error, msg: error.message });
//     }
// } 