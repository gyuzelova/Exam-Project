const router = require('express').Router();
const fishService = require('../services/fishService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage, validate } = require('../utils/errorUtils');



router.post('/create', async (req, res, next) => {
    const fishData = req.body;

    try {
        const postFish = await fishService.create(req.user._id, fishData);
console.log(postFish);
        res.status(200).json(postFish)
    } catch (err) {
console.log(err);
        res.status(200).send(err.message || err)
    }

});

router.get('/details/:fishId', async (req, res) => {
  console.log({"DETAILS":req.params.fishId});
    try {
        const fish = await fishService.getOne(req.params.fishId).lean();
        // const isOwner = fish.owner && fish.owner[0] == req.user?._id;
        // const checkIsLiked = fish.likedList.filter((item) => item == req.user?._id);
        // const isLiked = checkIsLiked.length === 0 ? false : true;
        res.status(200).send(fish)
    } catch (err) {
        console.log(err);
        res.status(200).send(err.message || err)
    }
});

router.get('/edit/:fishId', isAuth, async (req, res) => {

    try {
        const fish = await fishService.getOne(req.params.fishId).lean();
        res.status(200).send(fish)
    } catch (err) {
        res.status(400).json({ 'Error': err.message })
    }

});

router.put('/edit/:fishId', async (req, res) => {
    const editedFish = req.body;
    console.log({"EDIT":editedFish});
    try {
        const fish = await fishService.edit(req.params.fishId, editedFish);

        res.status(200).send(fish)
    } catch (err) {
        res.status(200).send(err.message || err)
    }

});

router.delete('/delete/:fishId', async (req, res) => {

    try {
        const fish = await fishService.delete(req.params.fishId);
       console.log(fish);
        res.status(200).json(fish)
    } catch (err) {
        res.status(340).send(err.message || err)
    }
});


router.get('/liked/:fishId', async (req, res) => {

    try {
        const fish = await fishService.liked(req.params.fishId, req.user._id);
        res.status(200).send(fish)
    } catch (err) {
        res.status(200).send(err.message || err)
    }
});

module.exports = router;