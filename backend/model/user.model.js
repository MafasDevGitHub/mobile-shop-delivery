const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

userSchema.pre('save', async function (next) {
    let user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash;
    }
    next();
})

userSchema.statics.emailIsTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

userSchema.methods.comparePassword = async function(candidatePassword){
    let user = this
    const match = await bcrypt.compare(candidatePassword,user.password)
    return match
  }

module.exports = mongoose.model('User', userSchema);