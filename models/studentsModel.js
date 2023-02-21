const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    surname:{
        type: String,
        trim: true,
        required:true
    },
    contact:{
        type:Number,
        trim: true, 
        required:true
    },
    department:{
        type: String,
        trim: true,
        required: true
    }
})

const studentSchema = mongoose.model('students', schema);
module.exports = studentSchema;