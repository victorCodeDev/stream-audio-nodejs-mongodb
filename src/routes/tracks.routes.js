const { Router } = require('express');
const router = Router();

const { getTrack, uploadTrack } = require('../controllers/tracks.controllers');

router.get('/:trackId', getTrack);

router.post('/', uploadTrack);

module.exports = router;