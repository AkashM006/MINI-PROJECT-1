const app = require('express').Router();
const passport = require('passport');
const sequelize = require('sequelize');
const { Feedback } = require('../models/feedback');
const User = require("../models/user")

// app.get("/engineer/:eid", passport.authenticate("jwt", { seesion: false }), async (req, res) => {
//     const user = await req.user;
//     if (user.type !== 3) {
//         return res.status(400).json({
//             success: false,
//             msg: "You are not authorized for this operation"
//         });
//     }
//     const eid = req.params.eid;

//     try {
//         const users = await User.findOne({
//             where: { id: eid }
//         });
//         console.log(users);
//     } catch (err) {
// console.log(err);
// return res.status(400).json({
//     success: false,
//     msg: "Something went wrong, please try again!"
// })
//     }
// });

app.get("/engineer/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    // this is only for admins:
    const user = await req.user;
    if (user.type !== 3) {
        return res.status(400).json({
            success: false,
            msg: "You are not authorized for this operation"
        });
    }
    const id = req.params.id;
    try {
        const user = await User.findOne({
            attributes: ['id', 'name', 'email', 'createdAt'],
            where: { id: id },
            include: [
                {
                    model: Feedback,
                    attributes: ['id', 'rating', 'feedback'],
                    as: 'engineerFeedback'
                }
            ]
        })
        const result = await User.findAll({
            attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'avg_rating']],
            include: [
                {
                    model: Feedback,
                    attributes: [],
                    as: 'engineerFeedback'
                }
            ],
            group: ['user.id'],
            where: { id: id }
        });

        return res.json({
            success: true,
            msg: user,
            rating: result
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            msg: "Something went wrong, please try again!"
        })
    }
    // const type = req.params.type;
    // // if type is engineer the initially get all engineers with their rating
    // try {
    const result = await User.findAll({
        attributes: ['id', 'name', 'email', [sequelize.fn('avg', sequelize.col('rating')), 'avg_rating']],
        include: [
            {
                model: Feedback,
                attributes: [],
                as: 'engineerFeedback'
            }
        ],
        group: ['user.id'],
        where: { type: type }
    });
    //     return res.status(200).json({
    //         success: true,
    //         msg: result
    //     })
    // } catch (err) {
    //     console.log(err);
    //     return res.status(400).json({
    //         success: false,
    //         msg: "Something went wrong!"
    //     });
    // }
})


app.get("/:type", passport.authenticate("jwt", { session: false }), async (req, res) => {
    // this is only for admins:
    const user = await req.user;
    if (user.type !== 3) {
        return res.status(400).json({
            success: false,
            msg: "You are not authorized for this operation"
        });
    }
    const type = req.params.type;
    // if type is engineer the initially get all engineers with their rating
    try {
        const result = await User.findAll({
            attributes: ['id', 'name', 'email', [sequelize.fn('avg', sequelize.col('rating')), 'avg_rating']],
            include: [
                {
                    model: Feedback,
                    attributes: [],
                    as: 'engineerFeedback'
                }
            ],
            group: ['user.id'],
            where: { type: type }
        });
        return res.status(200).json({
            success: true,
            msg: result
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            msg: "Something went wrong!"
        });
    }
})


module.exports = app