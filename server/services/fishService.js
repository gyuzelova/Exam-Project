const Fish = require('../models/Fish');
const User = require('../models/User');



exports.getAll = () => Fish.find();

exports.getLatest = () => Fish.find().sort({ createdAt: 'desc' }).limit(3);

exports.getOwn = (id) => Fish.find({owner:[id]})

exports.getOne = (fishId) => Fish.findById(fishId);

exports.getOneDetailed = (fishId) => Fish.findById(fishId).populate('owner');

exports.edit = (fishId, fishData) => Fish.findByIdAndUpdate(fishId, fishData, { runValidators: true });

exports.delete = (fishId) => Fish.findByIdAndDelete(fishId);

exports.search = (name) => {
    let surchName = '';
    for (let i = 0; i < name.length; i++) {
        if (i !== 0) {
            surchName += name[i].toUpperCase()
        } else {
            surchName += name[i].toLowerCase()
        }
    }
    surchName = new RegExp(surchName, 'i');
    console.log(surchName);
    return Fish.find({ name: surchName })
}

exports.create = async (userId, fishData) => {
    const createdFish = await Fish.create({
        owner: userId,
        ...fishData,
    });
    const user = await User.findById(userId);
    user.createPost.push(createdFish._id);
    await user.save()
    return createdFish;
};

exports.liked = async (fishId, userId) => {
    const fish = await Fish.findById(fishId);
    fish.likedList.push(userId);
    await fish.save();
}



