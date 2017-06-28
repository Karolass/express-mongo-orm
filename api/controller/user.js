const User = require('../model/user.js')
const helper = require('../helper/helper.js')

module.exports = {
    find: async (req, res) => {
        try {
            const result = await User.find().limit(req.query.limit).skip(req.query.skip).exec()

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }
    },
    findOne: async (req, res) => {
        try {
            const result = await User.findOne({ _id: req.params.userId }).exec()

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }
    },
    create: async (req, res) => {
        try {
            const user = new User({
                email: req.body.email,
                name: req.body.name
            })
            const result = await user.save()

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }
    },
    update: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.userId }).exec()

            user.email = req.body.email
            user.name = req.body.name
            const result = await user.save()

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }
    },
    delete: async (req, res) => {
        try {
            const result = await User.remove({ id: req.params.userId })

            if (result) {
                return res.send({ message: `delete userId:${req.params.userId} success` })
            } else {
                return res.send({ message: `userId:${req.params.userId} is not exists` })
            }
        } catch (err) {
            return helper.err(err, res)
        }
    }
}