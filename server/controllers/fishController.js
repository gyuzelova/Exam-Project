const router = require('express').Router();
const fishService = require('../services/fishService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage, validate } = require('../utils/errorUtils');



router.post('/create', isAuth, async (req, res, next) => {
    const fishData = req.body;

    try {
        const postFish = await fishService.create(req.user._id, fishData);

        res.status(200).json(postFish)
    } catch (err) {

        res.status(400).json({ 'Error': err.message })
    }

});

router.get('/details/:fishId', async (req, res) => {
    try {
        const fish = await fishService.getOne(req.params.fishId).lean();
        // const isOwner = fish.owner && fish.owner[0] == req.user?._id;
        // const checkIsLiked = fish.likedList.filter((item) => item == req.user?._id);
        // const isLiked = checkIsLiked.length === 0 ? false : true;
        res.status(200).json(fish)
    } catch (error) {
        res.status(400).json({ 'Error': err.message })
    }
});

router.get('/:fishId/edit', isAuth, async (req, res) => {

    try {
        const fish = await fishService.getOne(req.params.fishId).lean();
        res.status(200).json(fish)
    } catch (err) {
        res.status(400).json({ 'Error': err.message })
    }

});

router.post('/:fishId/edit', isAuth, async (req, res) => {
    const editedStone = req.body;
    try {
        const fish = await fishService.edit(req.params.fishId, editedFish);

        res.status(200).json(fish)
    } catch (err) {
        res.status(400).json({ 'Error': err.message })
    }

});

router.get('/:fishId/delete', isAuth, async (req, res) => {
    try {
      const fish =   await fishService.delete(req.params.fishId); 
      res.status(200).json(fish)
    } catch (error) {
        res.status(400).json({ 'Error': err.message })
    }
    

  
});


router.get('/:fishId/liked', async (req, res) => {
    try {
        const fish = await fishService.liked(req.params.fishId, req.user._id);
        res.status(200).json(fish)
    } catch (error) {
        res.status(400).json({ 'Error': err.message })
    }
});

module.exports = router;