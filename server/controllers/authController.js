const router = require('express').Router();
const jwt = require('../lib/jwt');
const authService = require('../services/authService');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { SECRET } = require('../config');
const fishService = require('../services/fishService')



router.post('/register', isGuest,  async (req, res) => {
    const userData = req.body;
    console.log({'reqBody_REGISTER':userData});

    if (!userData.password || userData.password === "" || !userData.rePassword || userData.rePassword === "") {
        throw new Error('Password is required!')
    }
    
    if (userData.password !== userData.rePassword) {
        throw new Error('Password missmatch!')
    }
    
    if (userData.password.length < 4) {
        throw new Error('Password too short')
    } 
 
    
    let userDTO = {
        "email": userData.email,
        "gender": userData.gender,
        "password": userData.password,
    }
    console.log({ 'DTO body': userDTO });

    try {
        const  result = await authService.register(userDTO);
        const  {token, email, id} = result
        console.log({token, email, id});
        res.cookie('auth', token).status(200).json({token, email, _id: id });

    } catch (err) {
        res.status(409).json(err.message || err);
    }
});

// router.get('/profile', async (req, res, next) => {
//     const token = req.cookies['auth'];
//     try {
//         const decodedToken = await jwt.verify(token, SECRET);
//         console.log({'tokenDECOD_Profil': decodedToken});
//         res.status(200).send(decodedToken);
//         next();
//     } catch(err) {
//         console.log(err.message || err);
//         res.status(200).send(err.message || err);
//         // res.redirect('/login');
//     }
   
// });

router.get('/profile/:userId', async (req, res, next) => {
    const id = req.user._id
   
    try {
        const user = await authService.getProfile(id);
        const fishs =  await fishService.getOwn(id);
        
        const userData = {  
            _id: user._id,
            email: user.email,
            gender: user.gender,
            password: user.password,  
            createPost: user.createPost.length,
            fishs: fishs
        }
        res.status(200).json(userData)
    } catch(err) {
        console.log(err.message || err);
        res.status(404).send(err.message || err);
        // res.redirect('/login');
    }
   
});

router.post('/login', isGuest,  async (req, res, next) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    console.log({'BODY':req.body});
  
        try {
            const result = await authService.login(data);
            const {token, email, id } = result
    console.log({token, email, id });
            res.cookie('auth', token).status(200).json({token, email, _id: id });
        } catch (err) {
            console.log(err);
            res.status(409).json(err.message || err);
        }
    
});

router.post('/logout', isAuth, (req, res) => {
    console.log({'ISAUT_LOGOUT': isAuth});
    const token = req.cookies['auth'];
 try {
    const user = undefined;
    console.log(req.token);
    res.status(204).clearCookie('auth').json({user});
 } catch (err) {
    res.status(404).json(err)
 }
  


});

module.exports = router;