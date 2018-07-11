"use strict";
//import 'rxjs/add/operator/toPromise';
Object.defineProperty(exports, "__esModule", { value: true });
var Test = /** @class */ (function () {
    function Test() {
    }
    ;
    Test.prototype.getAll = function () {
        return new Promise(function (resolve, reject) {
            resolve({
                success: true,
                message: 'Greetings from Model!!!',
                data: [
                    { id: 1, name: 'Bruce Wayne' },
                    { id: 1, name: 'Clark Kent' }
                ]
            });
        });
        /*return {
            success: true,
            message: 'Greetings from Model!!!',
            data: [
                {id: 1, name: 'Bruce Wayne'},
                {id: 1, name: 'Clark Kent'}
            ]
        };*/
    };
    return Test;
}());
exports.default = new Test();
//# sourceMappingURL=test.js.map