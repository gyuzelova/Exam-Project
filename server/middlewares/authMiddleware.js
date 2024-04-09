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
    } catch (err) {
        res.clearCookie('auth');
        res.status(401).send(err.message || err);
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
      return  res.status(401).json( 'Unauthorized!' )
    }

    next();
};

exports.isGuest = (req, res, next) => {
    console.log({gest: req.user});
    if (req.user) {
        
      return res.status(403).json('Forbidden' );
    };
    next();
  };