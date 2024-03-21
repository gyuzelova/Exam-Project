const router = require('express').Router();
const authService = require('../services/authService');
const { getErrorMessage, validate } = require('../utils/errorUtils');
const {isAuth, isGuest} = require('../middlewares/authMiddleware')


router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/register', isGuest,  async (req, res) => {
    const userData = req.body;
   
if (!userData.password || userData.password ==="" || !userData.rePassword || userData.rePassword ==="") {
    res.render('register', { error: 'Password is required!' })
  
} else if (userData.password !== userData.rePassword){
    res.render('register', { error: 'Password missmatch!' })
} else if(userData.password.length < 4){
    res.render('register', { error: 'Password too short' })
} else {
    let userDTO = {
        "email": userData.email,
        "password": userData.password,  
    }
    console.log({'DTO body': userDTO});
    
    try {
       const token = await authService.register(userDTO);
       res.cookie('auth', token);

        res.redirect('/');
    } catch (err) {
        res.render('register', { ...userData, error: getErrorMessage(err) })
    }
}

   
});

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;
if (!password || password === '') {
    res.render('login',  { error: 'Password is required!'});
} else {
    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);

        res.redirect('/');
    } catch (err) {
        res.render('login', { error: getErrorMessage(err), email });
    }  
}
  
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

module.exports = router;