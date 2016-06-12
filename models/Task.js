/**
 * Created by D on 29.4.2016 ã..
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserProfile = require('.//UserProfile');

var Task = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    overallTime: {type: Number, required: true},
    priority: {type: String, required: true},
    status: {type: String, required: true},
    assignTo: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
    completion: {type: Number, required: true},
    createAt: {type: Date, default: Date.now}
});

var taskModel = mongoose.model('Task', Task);

module.exports = taskModel;
