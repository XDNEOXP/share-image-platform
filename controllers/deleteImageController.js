const fs = require('fs')

const Image = require('../models/Image')

const deleteImageController = async (req, res) => {
    const image = await Image.findOne({
        where: {
            image_id: req.query.image_id,
        },
    })
    await Image.destroy({
        where: {
            image_id: req.query.image_id,
        },
    })
    try {
        await fs.unlinkSync(`public/uploads/${image.image_name}`)
    } catch (error) {
        console.log('Error: ', error)
    }
    res.redirect('/dashboard')
}

module.exports = deleteImageController
