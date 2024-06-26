const router = require('express').Router();
const fishService = require('../services/fishService');
const { getErrorMessage, validate } = require('../utils/errorUtils');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');


router.post('/create', isAuth, async (req, res, next) => {
    const fishData = {
        name: req.body.name,
        image: req.body.image,
        type: req.body.type,
        description: req.body.description,
    };
    const userId = req.body.userID

    try {
        const postFish = await fishService.create(userId, fishData);
        res.status(200).json(postFish)
    } catch (err) {
        console.log(err);
        res.status(409).json(err.message || err)
    }
});

router.get('/details/:fishId', isAuth, async (req, res) => {

    try {
        const fish = await fishService.getOne(req.params.fishId).lean();
        // const isOwner = fish.owner && fish.owner[0] == req.user?._id;
        // const checkIsLiked = fish.likedList.filter((item) => item == req.user?._id);
        // const isLiked = checkIsLiked.length === 0 ? false : true;
        res.status(200).json(fish)
    } catch (err) {
        console.log(err);
        res.status(404).json(err.message || err)
    }
});

router.get('/edit/:fishId', isAuth, async (req, res) => {
    try {
        const fish = await fishService.getOne(req.params.fishId).lean();
        res.status(200).json(fish)
    } catch (err) {
        res.status(404).json({ 'Error': err.message })
    }
});

router.put('/edit/:fishId', isAuth, async (req, res) => {
    const editedFish = req.body;
    console.log({ "EDIT": editedFish });
    try {
        const fish = await fishService.edit(req.params.fishId, editedFish);
        res.status(200).json(fish)
    } catch (err) {
        res.status(209).json(err.message || err)
    }

});

router.delete('/delete/:fishId', isAuth, async (req, res) => {
  
    try {
        const fish = await fishService.delete(req.params.fishId);
        console.log(fish);
        res.status(200).json(fish)
    } catch (err) {
        res.status(409).json(err.message || err)
    }
});

router.get('/liked/:fishId', isAuth, async (req, res) => {
    try {
        const fish = await fishService.liked(req.params.fishId, req.user._id);
        res.status(200).json(fish)
    } catch (err) {
        res.status(409).json(err.message || err)
    }
});

module.exports = router;