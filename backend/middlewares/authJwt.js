const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const responseHandler = require("../handlers/responseHandler");
const TOKEN = "x-access-token";

/**
 * Used to Check whether a Valid Token is present in the Url.
 * Throws error if not found
 */
verifyToken = (req, res, next) => {
  let token = req.headers[TOKEN];

  if (!token) {
    throw new Error("No token provided!");
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.decoded = { decodedId: decoded.id };
    next();
  });
};


/**
 * Used to check if the user trying to access the url is a valid user with role being active
 * If User Valid - Then appends the user and the roles he can access with the request to pass to next middleware
 * If not valid - throws error
 */
isUser = (req, res, next) => {
  //checking if token exists on url
  let token = req.headers[TOKEN];

  if (!token) {
    throw new Error("No token provided!");
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    db.user.findOne({
      attributes: ['id', 'name', 'email', 'isActive'],
      where: {
        id: decoded.id,
        isActive: true
      }
    }).then(user => {

      if (user) {
        //saving the result in the request with 'decoded' for later use in controller
        req.decoded = {
          user: user
        };
        next();
        return;
      }

      if (!user) { throw new Error("No user found with this ID!"); } //403 Error

    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser
};
module.exports = authJwt;