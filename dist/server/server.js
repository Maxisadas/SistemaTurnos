"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var mongo_1 = __importDefault(require("./gateways/mongo"));
var Server = /** @class */ (function () {
    function Server(port) {
        this.app = express();
        this.port = port;
    }
    Server.init = function (port) {
        return new Server(port);
    };
    Server.prototype.publicFolder = function () {
        var publicFolder = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicFolder));
    };
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback());
        this.publicFolder();
        mongo_1.default();
    };
    return Server;
}());
exports.default = Server;
