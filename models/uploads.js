const mongoose = require('mongoose');


const uploadSchema = new mongoose.Schema({
    imagename: {
        type: String,
        required: true,
        unique: true
    },
    destination: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
})

const Upload = mongoose.model('Upload', uploadSchema);
module.exports = Upload;