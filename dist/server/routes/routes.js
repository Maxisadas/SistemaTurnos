"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes = express_1.Router();
routes.post('/crearTurno', function (req, res) {
    console.log("Probando");
});
exports.default = routes;
