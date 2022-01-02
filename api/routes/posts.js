const router = require('express').Router();
const Post = require('../models/Post')

//CRUD for POST
router.post('/', async (req, res) => {
    try {
        const newPost = await new Post(req.body).save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body
            },
            { new: true }
          );
          
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post.username === req.body.username){
        if(post){
            try{
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json('Post has been deleted!');
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(404).json('Post not found!');
        }
    }else{
        res.status(500).json('You can only delete your Post!')
    }
});

router.get('/', async (req, res) => {
    const username = req.query.username;
    const category = req.query.category;

    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(category){
            posts = await Post.find({
                categories: {
                    $in: [category]
                }
            })
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;