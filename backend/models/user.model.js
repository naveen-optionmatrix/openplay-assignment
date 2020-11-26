var bcrypt = require("bcryptjs");
const HASH_DIGIT = 8;
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING(25),
            allowNull: false,
            unique: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: {
                msg: "Must be a valid email address",
              }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: '1'
        }
    }, {
        scopes: {
            active: {
                where: {
                    isActive: true
                }
            }
        },
        hooks: {
            beforeCreate: function (user) {
                console.log('before create');
                console.log(user.password)
                let password = user.password.trim();
                if (password) {
                    user.password = bcrypt.hashSync(password, HASH_DIGIT);
                } else {
                    throw new Error("You can't create a user without a password!");
                }
            },
            beforeUpdate: function (user, options) {
                console.log('beforeUpdate');
                hashPassword(user, options);
            },
            beforeBulkCreate: function (records, fields) {
                console.log('before bulk create');
                for (const user of users) {
                    if (user.password) {
                        user.password = bcrypt.hashSync(user.password, HASH_DIGIT);
                    } else {
                        throw new Error("You can't create a user without a password!");
                    }
                }
            },
            beforeBulkUpdate: function (attributes, where) {
                console.log('before bulk update');
                for (const user of users) {
                    hashPassword(attributes, where);
                }
            }
        }
    });

    function hashPassword(user, options) {
        console.log("hashPassword is called");
        console.log(user.password)
        //Don't hash if password is already hashed
        if (user.dataValues.password == user._previousDataValues.password) {
            console.log("Already Encrypted");
            return;
        }

        user.password = user.password.trim();
        if (!user.password || user.password == "") {
            throw new Error("You can't create/update a user without a password!");
        }

        user.password = bcrypt.hashSync(user.password, HASH_DIGIT);
        console.log("password Encrypted")
    }
    return User;
};