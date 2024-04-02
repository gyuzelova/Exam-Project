const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config');



exports.register = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (user) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    userData.password = hashedPassword
   // console.log({"exports.register ====": hashedPassword});
    
    const userDb = await User.create(userData);
   // console.log({"DB User": userDb})
    const payload = {
        _id: userDb._id,
        email: userDb.email,
    };
    const token = await jwt.sign(payload, SECRET, { });
    // console.log(token);
    return {userDb, token};
};


exports.login = async (email, password) => {
    // Get user from db
    const user = await User.findOne({ email });
   console.log({'USER_LOGIN':user});
    // Check if user exists
    if (!user) {
        throw new Error('Cannot find email or password');
    }

    const hash = await bcrypt.hash(password, 12);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find email or password');
    }
 
  const payload = {
    _id: user._id,
    email: user.email,
};

const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' });

// return token
return {user, token};

  
}

exports.profile = async (userData) => {
    const id = userData._id;
    const user = await User.findById(id);
    return user
}
exports.getProfile = async (id) => {
    const user = await User.findById(id);
    console.log({"USER_PROFIL": user});
    return user
}