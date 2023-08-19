const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware')
const blogController = require('../controllers/blogController');


router.post('/login', authController.login);

router.post('/addUser',authMiddleware.checkLoggedIn, authMiddleware.checkRole('admin'), userController.createUser);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllActiveUsers', userController.getAllActiveWriters);

router.get('/singleUser/:id',authMiddleware.checkLoggedIn, authMiddleware.checkRole('admin'), userController.getUserById);

router.post('/:userId/add-blog',authMiddleware.checkLoggedIn, userController.addBlogToUser);

router.patch('/update-status/:userId',authMiddleware.checkLoggedIn, authMiddleware.checkRole('admin'), userController.updateUserStatus);

router.post('/create-blog', blogController.createBlog);

// Get all blogs
router.get('/all-blogs', blogController.getAllBlogs);
router.get('/all-active-blogs', blogController.getAllActiveBlogs);

// Get all blogs by user ID
router.get('/user-blogs/:userId',authMiddleware.checkLoggedIn, blogController.getAllBlogsByUserId);

// Add a comment to a blog by ID
router.post('/add-comment/:blogId', authMiddleware.checkLoggedIn,authMiddleware.checkRole('admin'), blogController.addComment);

// Change status of a blog by ID
router.patch('/change-blog-status/:blogId',authMiddleware.checkLoggedIn, authMiddleware.checkRole('admin'), blogController.changeBlogStatus);

// Change status of a comment by index and ensure user is authenticated and owns the blog
router.patch('/change-comment-status/:blogId/:commentIndex',authMiddleware.checkLoggedIn, authMiddleware.checkRole('admin'), blogController.changeCommentStatus);

module.exports = router;
