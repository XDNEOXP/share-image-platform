const { DataTypes } = require('sequelize')
const db = require('../configs/db')

const Image = db.define(
    'images',
    {
        image_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        image_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            autoIncrement: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: false,
    }
)

module.exports = Image
