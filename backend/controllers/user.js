const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

class Auth {

  static login(req, res, next) {
    const { username } = req.body;
    const user = {
      username
    };
    
    const token = jwt.sign(user, process.env.cookieParserSecret);
    return res.status(200).json({
      user,
      token
    });
  }


  static signup(req, res, next) {
    const {
      body: { username, password }
    } = req;

    User.register(
      new User({
        username,
        password,
        email: username,
        active: true // change to false if you want the user to activate through email
      }), password, async (error, account) => {
        if (error) {
          return res.status(500).json({ message: "Password Error", error });
        }
        return res.status(200).json({ message: "User registered" });
      }
    );
  }
}

module.exports = { Auth };