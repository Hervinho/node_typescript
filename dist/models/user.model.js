"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var User = (function () {
    function User() {
        this.setup();
    }
    User.prototype.setup = function () {
        this.UserSchema = new mongoose_1.Schema({
            username: {
                type: String,
                unique: true,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        });
        this.UserSchema.pre("save", function (next) {
            var user = this;
            if (this.isModified("password") || this.isNew) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return next(err);
                    }
                    bcrypt.hash(user.password, salt, null, function (err, hash) {
                        if (err) {
                            return next(err);
                        }
                        user.password = hash;
                        next();
                    });
                });
            }
            else {
                return next();
            }
        });
        this.UserSchema.methods.comparePassword = function (passwd, callback) {
            bcrypt.compare(passwd, this.password, function (err, isMatch) {
                if (err) {
                    console.log("Error: ", err);
                    return callback(err);
                }
                callback(null, isMatch);
            });
        };
        this.UserSchema = mongoose.model("User", this.UserSchema);
    };
    return User;
}());
exports.default = new User();
