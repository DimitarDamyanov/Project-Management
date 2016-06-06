/**
 * Created by D on 2.4.2016 ã..
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var profile = new Schema({
    name: {type: String},
    email: {type: String},
    position: {type: String},
    phone: {type: String},
    avatar: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'}
});

var userProfileModel = mongoose.model('UserProfile', profile);
module.exports = userProfileModel;