const router = require('express').Router();

const {
    createThoughts,
    getThoughts,
    getSingleThought,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtsController');

// router.route('/').get(getThoughts).post(createThoughts);

router.get('/', getThoughts);
router.post('/', createThoughts);

router
    .route('/:thoughtsId')
    .get(getSingleThought)
    .put(updateThoughts)
    .delete(deleteThoughts)

router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction)
    
module.exports = router;