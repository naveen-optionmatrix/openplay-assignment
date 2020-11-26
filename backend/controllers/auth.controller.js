
const responseHandler = require("../handlers/responseHandler");
const config = require("../config/auth.config");
const db = require("../models");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * Below action is used to register a user into DB
 * @param {*} req 
 * @param {*} res 
 */
exports.signup = async (req, res) => {
  // Save User to Database
  try{
   let user = await db.user.create({ name: req.body.name, email: req.body.email, password: req.body.password });
    console.log("user", user)
    responseHandler.handleSuccess(res, "User was registered successfully!");
  } catch(err){
    console.log("err", err)
    if (err instanceof db.Sequelize.UniqueConstraintError) {
      responseHandler.handleFailure(res, err.errors[0].message);
    } else {
      // handle other error
    // res.status(500).send({ message: err.message });
    responseHandler.handleFailure(res, "Trouble in Signing-up. Please try later.");
    }
  }
};

/**
 * Below action is used to sign-in a valid user into the application
 * @param {*} req 
 * @param {*} res 
 */
exports.signin = async (req, res) => {
  try{
    let userDetails = await db.user.findOne({
      attributes: ['id', 'name', 'email', 'password','isActive'],
      where: {
        email: req.body.email,
        isActive: true
      }
    });

    if (userDetails) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        userDetails.password
      );

      if (passwordIsValid) {
        var token = jwt.sign({ id: userDetails.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        let result = {
          id: userDetails.id,
          name: userDetails.name,
          email: userDetails.email,
          accessToken: token
        };

        return responseHandler.handleSuccess(res, result);
      } else {
        return responseHandler.handleFailure(res, "Invalid Username/Password");
      }
    } else {
      return responseHandler.handleFailure(res, "Invalid Username/Password");
    }

  } catch(err){
    console.log("err", err)
    // res.status(500).send({ message: err.message });
    responseHandler.handleFailure(res, "Trouble in Signing-in. Please try later.");
  }
};