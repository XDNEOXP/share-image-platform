const express = require('express')
const dashboardController = require('../controllers/dashboardController')
const signupController = require('../controllers/signupController')
const loginController = require('../controllers/loginController')
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/auth')
const { body } = require('express-validator')
const logoutController = require('../controllers/logoutController')
const adminImageController = require('../controllers/adminImageController')
const upload = require('../helpers/upload')
const resize = require('../helpers/resize')
const deleteImageController = require('../controllers/deleteImageController')

const router = express.Router()

// GET
router.get('/', checkNotAuthenticated, (req, res) => res.redirect('/login'))
router.get('/dashboard', checkAuthenticated, dashboardController)
router.get('/signup', checkNotAuthenticated, signupController.get)
router.get('/login', checkNotAuthenticated, loginController.get)

// POST
router.post(
    '/signup',
    checkNotAuthenticated,
    body('name').not().isEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    signupController.post
)
router.post(
    '/login',
    checkNotAuthenticated,
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    loginController.post
)
router.post(
    '/image/upload',
    checkAuthenticated,
    upload.single('image'),
    resize,
    adminImageController
)

// DELETE
router.delete('/logout', checkAuthenticated, logoutController)
router.delete('/image/', checkAuthenticated, deleteImageController)

module.exports = router
