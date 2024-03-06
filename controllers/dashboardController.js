const Image = require('../models/Image')

const dashboardController = async (req, res) => {
    const images = await Image.findAll({
        where: {
            user_id: req.user.user_id,
        },
    })
    res.render('dashboard', {
        user: req.user,
        title: 'Dashboard',
        flash: req.flash(),
        images,
    })
}

module.exports = dashboardController
