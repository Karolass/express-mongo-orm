const mongoose = require('mongoose')
const Schema = mongoose.Schema
const util = require('util')

const config = require('./env')
mongoose.Promise = global.Promise
const db = process.env.NODE_ENV != 'test' ? config.db : config.db + '-Test'
const conn = mongoose.createConnection(db)

function BaseSchema() {
    Schema.apply(this, arguments)

    this.add({
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    })

    this.options.strict = false

    this.options.toJSON = {
        transform: function(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            delete ret.isValid
            delete ret.__t
            return ret
        }
    }
}
util.inherits(BaseSchema, Schema)

module.exports = {
    BaseSchema: BaseSchema,
    conn: conn
}
