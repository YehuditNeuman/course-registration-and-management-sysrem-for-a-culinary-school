import multer from "multer";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image');
    },
    filename: function (req, file, cb) {
        const originalFileName = file.originalname;
        cb(null, originalFileName);
    }
});

export const upload = multer({ storage: storage }).single('url');

export const uploadImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error uploading image.');
        }
    
        next();
    });
};




