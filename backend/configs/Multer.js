const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileType = file.mimetype.split('/')[0]; // Check the type of file
        let uploadPath;

        if (fileType === 'image') {
            uploadPath = path.join(__dirname, '../Public/Uploads/Images');
        } else {
            return cb(new Error('Invalid file type'), false);
        }

        // Ensure the directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
