const fs = require('fs')
const sharp = require('sharp')

const resize = async (req, res, next) => {
    if (req.file) {
        sharp.cache(false)
        await sharp(req.file.path)
            .resize(400)
            .toFile(`public/uploads/${req.file.filename}`)
        await fs.unlinkSync(req.file.path)
        next()
    } else {
        req.flash('error', 'Please Select A File')
        res.redirect('/dashboard')
    }
}

module.exports = resize
