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
var Turno_1 = __importDefault(require("../models/Turno"));
var Paciente_1 = __importDefault(require("../models/Paciente"));
var utils_1 = __importDefault(require("../utils/utils"));
var routes = express_1.Router();
// parse application/x-www-form-urlencoded
routes.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
routes.use(body_parser_1.default.json());
routes.post('/crearTurno', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, dni, fechaTurno, horaTurno, error, pacienteDB, PacienteConTurno, fecha, turno, turnoDB;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, dni = _a.dni, fechaTurno = _a.fechaTurno, horaTurno = _a.horaTurno;
                error = false;
                return [4 /*yield*/, Paciente_1.default.find({ dni: dni })];
            case 1:
                pacienteDB = _b.sent();
                if (pacienteDB.length == 0) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "No se encuentra el paciente en el sistema"
                        })];
                }
                return [4 /*yield*/, Turno_1.default.find({ paciente: pacienteDB[0] })];
            case 2:
                PacienteConTurno = _b.sent();
                if (!(PacienteConTurno.length == 0)) return [3 /*break*/, 6];
                if (!utils_1.default.verify_date(fechaTurno, horaTurno)) return [3 /*break*/, 4];
                fecha = utils_1.default.utc_to_TimeZoneArgentina(fechaTurno, horaTurno);
                turno = new Turno_1.default({
                    fechaTurno: fecha,
                    fechaCreacion: utils_1.default.dateNowUTC_to_TimeZoneArgentina(),
                    estado: "Creado",
                    paciente: pacienteDB[0]
                });
                return [4 /*yield*/, turno.save().catch(function (err) {
                        error = true;
                        res.status(400).json({
                            err: err
                        });
                    })];
            case 3:
                turnoDB = _b.sent();
                if (!error) {
                    res.json({
                        turnoDB: turnoDB
                    });
                }
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(400).json({
                    err: true,
                    message: "La fecha que selecciono es incorrecto o la hora es incorrecto"
                })];
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(400).json({
                    err: true,
                    message: "Usted ya posee un turno"
                });
                _b.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
routes.get('/buscarTurno/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idPaciente;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idPaciente = req.params.id;
                return [4 /*yield*/, Turno_1.default.find({ paciente: idPaciente }).populate('paciente', 'nombre apellido').exec(function (err, turnosDB) {
                        if (err) {
                            return res.status(400).json({
                                message: "El paciente no existe"
                            });
                        }
                        res.json({
                            turnosDB: turnosDB
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
routes.put('/buscarTurno/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
exports.default = routes;
//# sourceMappingURL=routesTurno.js.map