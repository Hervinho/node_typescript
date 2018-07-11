"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var port = 4040;
app_1.default.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
exports.default = app_1.default;
