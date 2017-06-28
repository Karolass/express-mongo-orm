const { BaseSchema, conn } = require('../config/model.js')
const UserSchema = new BaseSchema()

UserSchema.add({
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: String,
    name: String,
    photo: String,
    isValid: {
        type: Boolean,
        default: true
    }
})

module.exports = conn.model('User', UserSchema)
