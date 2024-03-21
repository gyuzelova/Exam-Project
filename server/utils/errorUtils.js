const mongoose = require('mongoose');


exports.getErrorMessage = (err) => {
    if (err instanceof mongoose.MongooseError) {
       return Object.values(err.errors).at(0).message;
    } else if (err instanceof Error) {
       return err.message;
    }
};

// middleware factory
exports.validate = (Model) => async (req, res, next) => {
    try {
        const modelInstance = new Model(req.body);

        const isValid = await modelInstance.validate();

        if (!isValid) {
            return res.redirect('/404');
        }

        next();
    } catch (err) {
        // Its too disruptive
        const message = this.getErrorMessage(err);

        res.render('404', { error: message });
    }
}