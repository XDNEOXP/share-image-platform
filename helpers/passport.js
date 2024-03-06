const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

const initializePassport = (passport) => {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({
            where: {
                email,
            },
        })

        if (user == null) {
            return done(null, false, { message: 'User not found' })
        }

        try {
            if (User.validPassword(user, password)) {
                done(null, user)
            } else {
                done(null, false, { message: 'password is wrong' })
            }
        } catch (error) {
            done(error)
        }
    }
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, authenticateUser)
    )
    passport.serializeUser((user, done) => done(null, user.user_id))
    passport.deserializeUser(
        async (id, done) =>
            await done(
                null,
                await User.findOne({
                    where: {
                        user_id: id,
                    },
                })
            )
    )
}

module.exports = initializePassport
