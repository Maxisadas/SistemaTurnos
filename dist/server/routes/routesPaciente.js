"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = __importDefault(require("body-parser"));
var Paciente_1 = __importDefault(require("../models/Paciente"));
var routes = express_1.Router();
// parse application/x-www-form-urlencoded
routes.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
routes.use(body_parser_1.default.json());
routes.post("/crearPaciente", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nombre, apellido, dni, edad, pacienteDB, pacienteEncontrado, error_1, paciente;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nombre = _a.nombre, apellido = _a.apellido, dni = _a.dni, edad = _a.edad;
                return [4 /*yield*/, Paciente_1.default.find({ dni: dni })];
            case 1:
                pacienteEncontrado = _b.sent();
                if (!(pacienteEncontrado.length > 0)) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(400).json({
                        err: true,
                        message: "Este paciente ya existe en el sistema"
                    })];
            case 2:
                error_1 = false;
                paciente = new Paciente_1.default({
                    nombre: nombre,
                    apellido: apellido,
                    dni: dni,
                    edad: edad
                });
                return [4 /*yield*/, paciente.save().catch(function (err) {
                        error_1 = false;
                        return res.status(400).json({
                            err: err
                        });
                    })];
            case 3:
                pacienteDB = _b.sent();
                if (!error_1) {
                    return [2 /*return*/, res.status(200).json({
                            message: "El paciente se creo con exito",
                            pacienteDB: pacienteDB
                        })];
                }
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
routes.put("/actualizarPaciente/:id", function (req, res) {
    var _a = req.body, nombre = _a.nombre, apellido = _a.apellido, dni = _a.dni, edad = _a.edad;
    var id = req.params.id;
    Paciente_1.default.findByIdAndUpdate(id, { nombre: nombre, apellido: apellido, dni: dni, edad: edad }, { new: true, runValidators: true }, function (err, pacienteDB) {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err
            });
        }
        else {
            if (pacienteDB) {
                return res.json({
                    message: "Se ha modificado con exito",
                    pacienteDB: pacienteDB
                });
            }
            else {
                return res.json(400).json({
                    error: true,
                    message: "No se encontro al paciente"
                });
            }
        }
    });
});
exports.default = routes;
//# sourceMappingURL=routesPaciente.js.map