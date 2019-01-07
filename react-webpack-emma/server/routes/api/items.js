const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

// @route GET api/items
// Get all songs
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});


// @route Post api/items
// create a song
router.post('/', (req, res) => {
    const newItem = new Item({
        artist: req.body.artist,
        song: req.body.song
    });

    newItem.save()
        .then(item => res.json(item));
});

//get one song
router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json({ item }))
        .catch(err => res.status(404).json({ success: false }));
})




// @route delte api/items/:id
// delete a song
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
})



module.exports = router;