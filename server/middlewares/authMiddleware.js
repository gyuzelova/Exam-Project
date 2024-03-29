const jwt = require('../lib/jwt');
const { SECRET } = require('../config');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];
    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        //check is needed from if-else
        req.user = decodedToken;
        res.locals.isAuthenticated = true;
        //res.locals.user = decodedToken;

        next();
    } catch {
        res.clearCookie('auth');
        // res.redirect('/login');
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    next();
};

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }

    next();
};