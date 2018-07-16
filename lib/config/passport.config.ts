import {Strategy, ExtractJwt} from "passport-jwt";
import * as User from "../models/user.model";
import { secret } from "./jwt.config";
const user = User.default.UserSchema; //code breaks when using `user` as class attribute.

class Passport {
    constructor () {

    }

    private opts;
    //public user = User.default.UserSchema;
    public config (passport) {
        this.opts = {};
        this.opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
        this.opts.secretOrKey = secret;

        passport.use(new Strategy(this.opts, function(jwt_payload, done) {
            user.findOne({id: jwt_payload.id}, function(err, user) {
                  if (err) {
                      return done(err, false);
                  }
                  if (user) {
                      done(null, user);
                  } else {
                      done(null, false);
                  }
              });
        }));
    }
}

export default new Passport();