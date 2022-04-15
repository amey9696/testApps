const express = require('express');
const router = express.Router();
const { createPost, fetchPosts, deletePost, updatePost, updateValidations, fetchPost, postDetails } = require("../controllers/postController");

router.post('/create_post', createPost);
router.post('/update', updateValidations, updatePost);
router.get('/delete/:id', deletePost);
router.get('/posts/:page', fetchPosts);
router.get('/post/:id', fetchPost);
// router.get('/details/:id', postDetails);

module.exports = router;