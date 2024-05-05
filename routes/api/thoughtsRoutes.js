const router = require('express').Router();

const {
    createThoughts,
    getThoughts,
    getSingleThought,
    updateThoughts,
    deleteThoughts,
} = require('../../controllers/thoughtsController');

// router.route('/').get(getThoughts).post(createThoughts);

router.get('/', getThoughts);
router.post('/', createThoughts);

router
    .route('/:thoughtsId')
    .get(getSingleThought)
    .put(updateThoughts)
    .delete(deleteThoughts)
    
// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value

