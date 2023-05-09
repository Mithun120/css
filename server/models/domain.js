const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const domainSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    domainImg: {
        type: String
    },title:{
        type:String
    }
}, {
    collection: 'domain'
})
module.exports = mongoose.model('Domain', domainSchema) 