const router = require('express').Router();
const fishService = require('../services/fishService');

const { isAuth } = require('../middlewares/authMiddleware')

router.get('/', async (req, res) => {
    try {
        const fish = await fishService.getLatest().lean();
        res.status(200).json(fish)
    } catch (err) {
        res.status(404).json(err.message || err)
    }
});

router.get('/catalog', async (req, res) => {
    try {
        const fish = await fishService.getAll().lean();
        res.status(200).json(fish)
    } catch (err) {
        res.status(404).json(err.message || err)
    }
});

router.get('/404', (req, res) => {
    res.status(404)
});

module.exports = router;


// router.get('/search', async (req, res) => {
//     const fish = await fishService.getAll().lean();

//     res.render('search', { fish });
// });

// router.post('/search', async (req, res) => {
//     let name  = req.body.name;
//     console.log({'BODY-SURCHE':req.body});
//     console.log(req.body.name);
//     const fish = await fishService.search(name).lean();
// console.log(fish);
//     res.render('search', { fish, name });
// });

