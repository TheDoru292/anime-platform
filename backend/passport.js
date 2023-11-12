const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrpyt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    (username, password, cb) => {
      return User.findOne({ username })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect user or password." });
          }

          bcrpyt.compare(password, user.password, (err, success) => {
            if (err) {
              return cb(err);
            }

            if (success === false) {
              return cb(null, false, {
                message: "Incorrect email or password.",
              });
            }

            return cb(null, user, { message: "Logged in successfully." });
          });
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, cb) {
      return User.findOne({ _id: jwtPayload._id }, "_id")
        .then((user) => {
          cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
