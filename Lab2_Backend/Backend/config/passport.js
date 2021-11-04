"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require('../models/UserModel');
require('dotenv').config()

function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: process.env.secret
    }
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            const user_id = jwt_payload._id;
            User.findById(user_id, (err, results) => {
                if (err) {
                    return done(err, false);
                }
                if (results) {
                    done(null, results);
                }
                else {
                    done(null, false);
                }
            });
        })
    )
}

module.exports.auth = auth;
module.exports.checkAuth = passport.authenticate("jwt", { session: false });


