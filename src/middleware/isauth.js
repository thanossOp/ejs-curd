const passport = require('passport')

function isAuth() {
    return function (req, res, next) {

        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err || !user) {
                res.json({
                    status: 401,
                    message: 'not authorized'
                })
            } else {
                return next()
            }
        })(req, res, next)
    }
}

module.exports = isAuth