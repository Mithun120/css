const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profileImg: {
        type: String
    },title:{
        type:String
    },
    desc:{
        type:String
    },
    githublink:{
        type:String
    }
}, {
    collection: 'users'
})
module.exports = mongoose.model('User', userSchema)