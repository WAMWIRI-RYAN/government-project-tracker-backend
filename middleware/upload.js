const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'uploads/');

    },

    filename: (req, file, cb) => {

        const extension = path.extname(file.originalname);

        cb(null, uuidv4() + extension);

    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [

        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/pdf',
        'video/mp4'

    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(new Error('Unsupported file type.'), false);

    }

};

const upload = multer({

    storage,
    fileFilter,
    limits: {

        fileSize: 10 * 1024 * 1024

    }

});

module.exports = upload;