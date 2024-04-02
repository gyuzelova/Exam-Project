const router = require('express').Router();

const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const fishController = require('./controllers/fishController');

router.use(homeController);
router.use(authController);
router.use(fishController);


router.all('*', (req, res) => {
    res.status(404)
})
module.exports = router;