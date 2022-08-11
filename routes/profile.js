const app = require('express').Router();
const passport = require('passport');
const User = require('../models/user');

app.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const user = await req.user;
    console.log(user);
    const currentUser = {
        name: user.name,
        email: user.email,
        date: user.createdAt,
    }
    return res.json({
        success: true,
        msg: currentUser
    })
})

module.exports = app;