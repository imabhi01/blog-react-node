const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post')
const bcrypt = require('bcrypt');

//CRUD for USER

// router.put('/:id', async (req, res) => {
//     if (req.body.data.userId === req.params.id) {
//         if(req.body.password){
//             const salt = await bcrypt.genSalt(10);
//             req.body.password = await bcrypt.hash(req.body.password, salt);
//         }
//         try {
//             const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//                 $set: req.body,
//             }, {new: true})
//             res.status(200).json(updatedUser);
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     }else{
//         res.status(401).json('You can only update your account!');
//     }
// });

router.put("/:id", async (req, res) => {
    // try {

        const user = await User.findById(req.params.id);

        if (req.params.id === req.body.userId) {

            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }

            try {
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedUser);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
        res.status(401).json("You can update only your user!");
        }
    // } catch (err) {
    //   res.status(500).json(err);
    // }
});

router.delete('/:id', async (req, res) => {
    if(req.body.postId === req.params.id){
        const user = await User.findById(req.params.id);
        if(user){
            try{
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json('User has been deleted!')
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(404).json('User not found!');
        }
    }else{
        res.status(500).json('You can only delete your account!')
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(user){
            const {password, ...others} = user._doc;
            res.status(200).json(others);
        }else{
            res.status(404).json('User not found!');
        }
       
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;