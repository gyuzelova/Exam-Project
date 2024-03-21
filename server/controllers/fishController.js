const router = require('express').Router();
const fishService = require('../services/fishService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage, validate } = require('../utils/errorUtils');


router.get('/create', isAuth,  (req, res) => {
    res.render('create')
});

router.post('/create', isAuth, async (req, res) => {
    const fishData = req.body;

    try {
        await fishService.create(req.user._id, fishData);

        res.redirect('/dashboard')
    } catch (err) {

        res.status(400).render('create', { error: getErrorMessage(err), stoneData });
    }

});

router.get('/details/:fishId', async (req, res) => {
    const fish = await fishService.getOne(req.params.fishId).lean();
    const isOwner = fish.owner && fish.owner[0] == req.user?._id;
    const checkIsLiked = fish.likedList.filter((item) => item == req.user?._id);
    const isLiked = checkIsLiked.length === 0 ? false : true;
    console.log(isLiked);
    console.log({fish});
    res.render('details', { ...fish, isOwner, isLiked})
});

router.get('/:fishId/edit', isAuth, async (req, res) => {

    try {
        const fish = await fishService.getOne(req.params.fishId).lean();
        res.render('edit', { ...fish });
    } catch (err) {
        res.render('edit', { error: getErrorMessage(err) });
    }

});

router.post('/:fishId/edit', isAuth, async (req, res) => {
    const editedStone = req.body;
    try {
        await fishService.edit(req.params.fishId, editedFish);

        res.redirect(`/details/${req.params.fishId}`);
    } catch (err) {
        res.render('edit', { error: getErrorMessage(err) })
    }

});

router.get('/:fishId/delete', isAuth, async (req, res) => {
    await fishService.delete(req.params.fishId);

    res.redirect('/dashboard');
});


router.get('/:fishId/liked', async (req, res) => {
    await fishService.liked(req.params.fishId, req.user._id);
    console.log(req.params.fishId);

    res.redirect('/dashboard');
});

module.exports = router;