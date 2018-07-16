import { Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import * as User from "../models/user.model";
import { secret } from "../config/jwt.config";

class UserRoute {

    constructor(){
        this.router = Router();
        this.routes();
        this.UserModel = User.default.UserSchema;
    };

    public router;
    public UserModel;
    private getToken(headers) {
        let token;
        if (headers && headers.authorization) {
            let parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                token = parted[1]; //remove JWT string from the token.
            } else {
                token = null;
            }
        } else {
            token = null;
        }

        return token;
    }

    public routes() {
        //get all users.
        this.router.get("/", (req, res) => {
            let token = this.getToken(req.headers);

            if (token) {
                jwt.verify(token, secret, function(err, decoded) {
                    if (err) {
                        console.log(`Error : ${err}`);
                        res.json({success: false, message: 'JWT verification failed.'});
                    } else {
                        console.log(`Decoded : ${JSON.stringify(decoded)}`);
                        this.UserModel.find()
                            .then(function(users){
                            res.json({success: true, data: users});
                            });
                    }
                });
            } else {
                res.json({success: false, message: 'Unauthorized: No token was received.'});
            }

        });

        //create a user.
        this.router.post("/", (req, res) => {
            if (!req.body.username || !req.body.password) {
                res.json({success: false, msg: "Please pass username and password."});
            } else {
                let newUser = new this.UserModel({
                  username: req.body.username,
                  password: req.body.password
                });
                // save the user
                newUser.save(function(err, user) {
                  if (err) {
                      console.log(err);
                    return res.json({success: false, msg: "Error creating user", error: err});
                  }
                  res.json({success: true, msg: "Successful created new user.", id: user._id});
                });
            }
        });

        //user login.
        this.router.post("/login", (req, res) => {
            if (!req.body.username || !req.body.password) {
                res.json({success: false, msg: "Please pass username and password."});
            } else {
                this.UserModel.findOne({
                    username: req.body.username
                  }, function(err, user) {
                    if (err) res.json({success: false, message: "Error logging in", error: err});
                
                    if (!user) res.status(401).send({success: false, msg: "Authentication failed. User not found."});
                    else {
                      // check if password matches
                      user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                          //var token = jwt.sign(user.tojson(), secret);
                          let token = jwt.sign(user.toObject(), secret);
                    
                          res.json({success: true, token: "JWT " + token});
                        } else res.status(401).send({success: false, msg: "Authentication failed. Wrong password."});
                      });
                    }
                  });
            }
        });
    }
}

//make sure to export the router, so all routes will be accessible from app.ts
export default new UserRoute().router;