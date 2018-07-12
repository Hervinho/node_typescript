import * as mongoose from "mongoose";
import {
    Schema
} from "mongoose";
import * as bcrypt from "bcrypt-nodejs";

class User {
    public UserSchema;

    constructor () {
        this.setup();
    }

    private setup(): void {
        this.UserSchema = new Schema({
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

        this.UserSchema.pre("save", function (next) { // Note: Do not use arrow function because this.isModified will fail.
            let user = this;
            if (this.isModified("password") || this.isNew) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        return next(err);
                    }
                    bcrypt.hash(user.password, salt, null, (err, hash) => {
                        if (err) {
                            return next(err);
                        }
                        user.password = hash;
                        next();
                    });
                });
            } else {
                return next();
            }
        });
        
        // Note: Do not use arrow function because this function will fail.
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
    }
    
}


export default new User();