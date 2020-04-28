const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
console.log("dotenv", dotenv);

// anti ddos
const RateLimit = require("express-rate-limit");

// passport imports
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// mongo imports
require("mongodb");
require("mongodb").MongoClient;
require("./models/mongodb");

const indexRouter = require('./routes/index');
const auth = require("./routes/user");

const app = express();
const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.cookieParserSecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);
app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.cookieParserSecret
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
  
app.use("/auth", auth);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// passport initialize
const { User } = require("./models/user");
passport.use(new LocalStrategy(User.authenticate()));


// method for authorize user,
//it will assume the token is in header under Bearer Auth
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWTsecret
    },
    (jwtPayload, cb) => {
      //find the user in db if needed
      return User.findOne({
        username: jwtPayload.username
      })
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
