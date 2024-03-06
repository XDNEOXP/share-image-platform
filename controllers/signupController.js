const md5 = require('md5')
const { validationResult } = require('express-validator')
const User = require('../models/User')

const get = (req, res) => {
    res.render('signup', {
        title: 'Sign Up',
        flash: [],
        errors: [],
    })
}

const post = async (req, res) => {
    const existanceUser = await User.findOne({
        where: {
            email: req.body.email,
        },
    })

    if (existanceUser) {
        res.render('signup', {
            title: 'Signup',
            flash: [`${req.body.email} already exist`],
            errors: [],
        })
        return
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('signup', {
            title: 'Signup',
            flash: '',
            errors: errors.array(),
        })
        return
    }

    await User.create({
        user_id: md5(req.body.email + new Date()),
        name: req.body.name,
        email: req.body.email,
        password: await User.encryptPassword(req.body.password),
    })
    req.flash('success', 'Successfuly Created!')
    res.redirect('/login')
}

module.exports = {
    get,
    post,
}
