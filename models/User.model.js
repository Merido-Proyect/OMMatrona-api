const mongoose = require('mongoose')
const bcrytp = require('bcrypt')

const SALT_ROUNDS = 10

const PASSWORD_PATERN = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
const EMAIL_PATERN = 
/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User name is required']
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
        },
        phone: {
            type: Number,
            maxLength: 9,
            minLength: 9
        },
        user: {
            type: String,
            enum: [client, professional],
            required: [true, 'Type of user is required']
        }
    },
    {
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.__V;
                delete ret._id;
                delete ret.password;

                return ret
                }
         }
    }
)

UserSchema.pre('save', function(next) {
    if (this.isModified('password')){
        bcrytp.hash(this.password, SALT_ROUNDS)
        .then((hash)=> {
            this.password = hash;
            next()
        })
    } else {
        next()
    }
})

UserSchema.methods.checkPassword = function(passwordToCompare) {
    return bcrytp.compare(passwordToCompare, this.password)
}


const User = mongoose.model('User', UserSchema);
module.exports = User