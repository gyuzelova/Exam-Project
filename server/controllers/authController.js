const router = require('express').Router();
const authService = require('../services/authService');
const { getErrorMessage, validate } = require('../utils/errorUtils');
const {isAuth, isGuest} = require('../middlewares/authMiddleware');
const User = require('../models/User.js');


// router.get('/register', isGuest, (req, res) => {
//     res.render('register');
// });

router.post('/register', isGuest,  async (req, res) => {
    const userData = req.body;

    console.log(userData);
    console.log(userData.password);
  let errorMessage = ''
if (!userData.password || userData.password ==="" || !userData.rePassword || userData.rePassword ==="") {
    throw new Error ('Password is required!' )
  
} else if (userData.password !== userData.rePassword){
    throw new Error ('Password missmatch!' )
} else if(userData.password.length < 4){
    throw new Error('Password too short')
} else {
    let userDTO = {
        "email": userData.email,
        "password": userData.password,  
    }
    console.log({'DTO body': userDTO});
    
    try {
       const {user, token} = await authService.register(userDTO);
      console.log(user, token);
res.status(200).cookie('auth', token).send(user);
      
    } catch (err) {
        res.status(400).semd(err.message || err)
    }
}

   
});

router.get('/profile', (req, res, next) => {
    const { _id: userId } = req.user? req.user : [];
    console.log(req.user);
    console.log({ _id: userId });
    User.findOne({ _id: userId })
    .then(user => { res.status(200).json(user) })
    .catch(next);
});

router.post('/login', isGuest, async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
if (!password || password === '') {
    throw new Error ('Password is required!');
} else {
    try {
        const {user, token} = await authService.login(email, password);

        res.status(200).cookie('auth', token).send(user);
    } catch (err) {
        res.status(400).send(err.message || err);
    }  
}
  
});


router.post('/logout', isAuth, (req, res) => {
    const token = req.cookies['auth'];
    console.log('logout server');
    const user = undefined;
    console.log(req.token);
    res.status(204).clearCookie('auth').send(user);
    

});

module.exports = router;