const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const config = require('./env')
const db = process.env.NODE_ENV != 'test' ? config.db : config.db + '-Test'
const conn = mongoose.createConnection(db)

class BaseSchema extends Schema {
    constructor() {
        super()

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

        // this.options.strict = false

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

    extend(object) {
        this.add(object)
    }
}

module.exports = {
    BaseSchema: BaseSchema,
    conn: conn
}
