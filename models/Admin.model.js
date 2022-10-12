const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10;

const EMAIL_PATERN = 
/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const AdminSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'E-mail is required'],
            match: [EMAIL_PATERN, "E-mail does not have a valid format"],
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, 'A password is required'],
            match: [PASSWORD_PATERN, 'Password must contain: 8 characters, at least one letter and one number'],
            trim: true
        }        
    },
    {
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.__v;
                delete ret._id;
                delete ret.password;

                return ret
            }
        }
    })

    AdminSchema.pre('save', function(next) {
        if (this.isModified('password')) {
            bcrypt.hash(this.password, SALT_ROUNDS)
            .then((hash) => {
                this.password = hash
                next()
            })
        } else {
            next()
        }
    })

    AdminSchema.methods.checkPassword = function(passwordToCompare) {
        return bcrypt.compare(passwordToCompare, this.password)
    }

    const Admin = mongoose.model('Admin', AdminSchema)
    module.exports = Admin