const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const { Auth } = require("../controllers/user");


function passportLogin() {
  try {
    passport.authenticate("local");
  } catch (error) {
    console.log(error);
  }
}

//login method
router.post("/login", passport.authenticate("local"), Auth.login);

// route to signup
router.post(
  "/signup",
  [check("username").isEmail(), check("password").isLength({ min: 8})],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({
        error: errors.array()
      });
      return res.status(422).json({
        errors: errors.array()
      });
    }

    Auth.signup(req, res, next);
  }
);

// test route
router.get(
  "/private",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res, next) =>
    res.status(200).json({
      msg: "OK",
      user: req.user
    })
);


module.exports = router;