"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport_jwt_1 = require("passport-jwt");
var User = require("../models/user.model");
var jwt_config_1 = require("./jwt.config");
var user = User.default.UserSchema; //code breaks when using `user` as class attribute.
var Passport = /** @class */ (function () {
    function Passport() {
    }
    //public user = User.default.UserSchema;
    Passport.prototype.config = function (passport) {
        this.opts = {};
        this.opts.jwtFromRequest = passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt');
        this.opts.secretOrKey = jwt_config_1.secret;
        passport.use(new passport_jwt_1.Strategy(this.opts, function (jwt_payload, done) {
            user.findOne({ id: jwt_payload.id }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            });
        }));
    };
    return Passport;
}());
exports.default = new Passport();
