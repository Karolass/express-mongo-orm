const env = require('../config/env.js')

const jwt = require('jwt-simple')

module.exports = {
    verify: function(req, res, next) {
        if (!req.headers['x-access-token']) {
            return res.status(401).send({
                message: 'x-access-token is require'
            })
        } else {
            const token = req.headers['x-access-token']

            try {
                const decoded = jwt.decode(token, env.secret)
                if (new Date(decoded.expireAt) < new Date()) {
                    return res.status(401).send({
                        message: 'x-access-token is expired'
                    })
                }
                req.query.userId = decoded.userId
                next()
            } catch (err) {
                return res.status(400).send({
                    message: `x-access-token ${err.message}`
                })
            }
        }
    },
}
