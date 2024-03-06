const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../configs/db')

const User = db.define(
    'users',
    {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    }
)

User.validPassword = (user, pwd) => {
    return bcrypt.compareSync(pwd, user.password)
}

User.encryptPassword = async (myPlaintextPassword) => {
    const saltRounds =
        Number(process.env.SALT_ROUNDS) /* FOR DEFAULT VALUE */ || 10
    const salt = await bcrypt.genSaltSync(saltRounds)
    const hash = await bcrypt.hashSync(myPlaintextPassword, salt)
    return hash
}

module.exports = User
