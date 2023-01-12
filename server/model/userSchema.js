const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    phone : {
        type: Number,
        require:true
    },
    work: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    },
    cpassword: {
        type: String,
        require:true
    },
    date: {
        type: Date,
        default:Date.now
    },
    messages: [
        {
            name: {
                type: String,
                require:true
            },
            email: {
                type: String,
                require:true
            },
            phone : {
                type: Number,
                require:true
            },
            message: {
                type: String,
                required:true
            }
        }
    ]
    ,
    tokens: [
        {
            token: {
                type: String,
                require:true
            }
        }
    ]
})


//== hashing the password in middleware code ==

userSchema.pre('save',async function(next) {
    // console.log("debuging")
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//=We are generating jwt token=
userSchema.methods.generateAuthToken = async function () {
    try {

        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        
        // console.log(token); debug token

        this.tokens = this.tokens.concat({ token: token });
        // concat means add something inside token
        await this.save();
        return token;

    } catch (err) {
        console.log(err)
    }
}

// stored the message

userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        
        this.messages = this.messages.concat({name, email, phone, message})

        await this.save();
        return this.messages;

    } catch (error) {
        console.log(error)
    }
}


//update detail userschema
userSchema.methods.updateDetail = async function (name, email, phone, work) {
    
    try {
    
        // let pass = await bcrypt.hash(password, 12);
        // let cpass = await bcrypt.hash(cpassword, 12);
        
        const update = await User.updateOne({
            $set: {
                name, email, phone, work
                // , password: pass, cpassword: cpass
            }
        })
        
        return update;

    } catch (error) {
        console.log(error)
    }
}

//collection creation
const User = mongoose.model('USER', userSchema);

module.exports = User;