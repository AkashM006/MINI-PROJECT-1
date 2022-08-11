const Sequelize = require("sequelize");
const db = require("../config/db");
const User = require("./user");
const ServiceCall = require("./serviceCall");

const Feedback = db.define('feedback', {
    rating: {
        type: Sequelize.INTEGER,
        allowNull: {
            args: false,
            msg: "rating is required"
        }
    },
    feedback: {
        type: Sequelize.STRING,
        allowNull: {
            args: false,
            msg: "feedback is required"
        }
    },
    engineerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: User,
            key: "id"
        }
    },
});

User.hasMany(Feedback, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    as: "engineerFeedback",
    foreignKey: {
        name: "engineerId",
        allowNull: false
    }
});

Feedback.belongsTo(User, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    as: "engineerFeedback",
    foreignKey: {
        name: "engineerId",
        allowNull: false
    }
});



module.exports = { Feedback };