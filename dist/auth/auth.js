"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Here, will be checking user credentials, sessions and tokens.
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.prototype.authenticate = function (req, res, next) {
        console.log('Separate middleware was invoked!');
        next();
    };
    return Auth;
}());
exports.default = new Auth();
