const Category = require('../models/Category')
const router = require('express').Router()

router.post('/', async (req, res) => {
    try {
        const newCategory = await Category({
            name: req.body.name
        }).save();
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.put('/', async(req, res) => {
    try{
        const category = await Category.findByIdAndUpdate(req.body.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(category);
    }catch(error){
        res.status(500).json(error);
    }
});


module.exports = router;