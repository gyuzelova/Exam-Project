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
    console.log({ "DB User": userDb })
    console.log(typeof (userDb));
    const payload = {
        _id: userDb._id,
        email: userDb.email,
    };
    const token = await jwt.sign(payload, SECRET, { expiresIn: '4h' });
    console.log({ 'tokenREGISTER': token });

    return { token, email: userDb.email, id: userDb._id }
};


exports.login = async (data) => {
    const user = await User.findOne({ email: data.email });
    console.log({ 'USER_LOGIN': user });

    if (!user) {
        throw new Error('Cannot find email or password');
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
        throw new Error('Email or password is invalid');
    };
    console.log(data.password, user.password);

    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '4h' });

    return { token, email: user.email, id: user._id };
}

exports.profile = async (userData) => {
    const id = userData._id;
    const user = await User.findById(id);
    return user
}
exports.getProfile = async (id) => {
    const user = await User.findById(id);
    console.log({ "USER_PROFIL": user });
    return user
}