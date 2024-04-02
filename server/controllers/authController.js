const router = require('express').Router();
const jwt = require('../lib/jwt');
const authService = require('../services/authService');
const { getErrorMessage, validate } = require('../utils/errorUtils');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const User = require('../models/User.js');
const { SECRET } = require('../config');


// router.get('/register', isGuest, (req, res) => {
//     res.render('register');
// });

router.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    console.log(userData);

    let validationError = '';

    if (!userData.password || userData.password === "" || !userData.rePassword || userData.rePassword === "") {
        validationResult = 'Password is required!'
    }
    
    if (userData.password !== userData.rePassword) {
        validationResult = 'Password missmatch!'
    }
    
    if (userData.password.length < 4) {
        validationResult = 'Password too short'
    } 
 
    
    let userDTO = {
        "email": userData.email,
        "password": userData.password,
    }
    console.log({ 'DTO body': userDTO });

    try {
        const { user, token } = await authService.register(userDTO);
        console.log(user, token);
        res.status(200).cookie('auth', token).send(user);

    } catch (err) {
        res.status(200).send(err.message || err)
    }
});

router.get('/profile', async (req, res, next) => {
    const token = req.cookies['auth'];
    try {
        const decodedToken = await jwt.verify(token, SECRET);
        console.log({'DECOD':decodedToken});
        res.status(200).send(decodedToken);
        next();
    } catch(err) {
        res.status(340).send(err.message || err);
        // res.redirect('/login');
    }
   
});

router.post('/login', isGuest, async (req, res, next) => {
    const { email, password } = req.body;
   
    if (!password || password === '') {
        throw new Error('Password is required!');
    } else {
        try {
            const { user, token } = await authService.login(email, password);

            res.status(200).cookie('auth', token).send(user);
        } catch (err) {
            res.status(200).send(err.message || err);
        }
    }
});

router.post('/logout', isAuth, (req, res) => {
    const token = req.cookies['auth'];
 
    const user = undefined;
    console.log(req.token);
    res.status(204).clearCookie('auth').send(user);


});

module.exports = router;