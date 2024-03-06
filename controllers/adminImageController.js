const md5 = require('md5')
const Image = require('../models/Image')

const adminImageController = async (req, res) => {
    await Image.create({
        image_id: md5(req.file.filename + new Date()),
        image_name: req.file.filename,
        image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${req.file.filename}`,
        user_id: req.user.user_id,
        created_at: new Date(),
    })
    res.redirect('/dashboard')
}

module.exports = adminImageController
