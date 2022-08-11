const app = require('express').Router();
const passport = require('passport');
const { genHash } = require('../config/utils');
const User = require('../models/user');

app.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const user = await req.user;
    const currentUser = {
        name: user.name,
        email: user.email,
        date: user.createdAt,
    }
    return res.json({
        success: true,
        msg: currentUser
    })
});

app.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const user = await req.user;
    let { name, password, email } = req.body.data;
    try {
        const userObject = await User.findOne({ where: { id: user.id } });
        userObject.name = name;
        userObject.email = email;
        if (password !== '') {
            password = await genHash(password);
            userObject.password = password;
        }
        userObject.save();
        return res.json({
            success: true,
            msg: "Successfully updated!"
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            msg: "Something went wrong!"
        })
    }
})

module.exports = app;