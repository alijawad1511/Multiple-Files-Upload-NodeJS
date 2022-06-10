const multer = require('multer');
const path = require('path');

// Set Disk Engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})



const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).array('image', 4);

function checkFileType(file, cb) {
    // Allowed Extensions
    const filetypes = /jpeg|jpg|png|gif/;

    // Check Extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check Mimetype 
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error : Allowed Images only');
    }
}

module.exports = upload;