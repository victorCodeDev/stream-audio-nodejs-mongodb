const multer = require('multer');
const { getConnection } = require('../database');
const { GridFSBucket, ObjectID } = require('mongodb');
const { Readable } = require('stream');

const getTrack = (req, res) => {
    let trackId;
    try {
        trackId = new ObjectID(req.params.trackId);
    } catch (error) {
        return res.status(400).json({ message: 'El id del track es invalido' });
    }

    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');
    const db = getConnection();
    const bucket = new GridFSBucket(db, {
        bucketName: 'tracks'
    });

    let downloadStream = bucket.openDownloadStream(trackId);

    downloadStream.on('data', chunk => {
        return res.write(chunk);
    });

    downloadStream.on('error', () => {
        return res.status(404);
    });

    downloadStream.on('end', () => {
        return res.end();
    });

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
        } else if (!req.body.name) {
            return res.status(400).json({ message: 'No se cargo el valor del nombre' });
        }

        const readableTrackStream = new Readable();
        readableTrackStream.push(req.file.buffer);
        readableTrackStream.push(null);

        let trackName = req.body.name;
        const db = getConnection();
        const bucket = new GridFSBucket(db, {
            bucketName: 'tracks'
        });

        let uploadStream = bucket.openUploadStream(trackName);
        const id = uploadStream.id;
        readableTrackStream.pipe(uploadStream);

        uploadStream.on('error', () => {
            return res.status(500).json({ message: 'Error al subir tu archivo' });
        });

        uploadStream.on('finish', () => {
            return res.status(201).json({ message: 'Archivo subido exitosamente' });
        });

    });

}

module.exports = { getTrack, uploadTrack }