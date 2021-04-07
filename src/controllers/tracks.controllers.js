const multer = require('multer');

const getTrack = (req, res) => {
    res.send('track');
}

const uploadTrack = (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({
        storage: storage,
        limits: {
            fields: 1,
            fileSize: 6000000,
            files: 1,
            parts: 2
        }
    });
    upload.single('track')(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err.message })
        }else if (!req.body.name){
            return res.status(400).json({ message: 'No se cargo el valor del nombre'});
        }
    });

    let trackName = req.body.name;
}

module.exports = { getTrack, uploadTrack }