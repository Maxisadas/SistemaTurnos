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
var Profesional_1 = __importDefault(require("../models/Profesional"));
var routes = express_1.Router();
// parse application/x-www-form-urlencoded
routes.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
routes.use(body_parser_1.default.json());
routes.post('/crearTurno', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, dni, fechaTurno, horaTurno, idProfesional, error, pacienteDB, profesionalDB, PacienteConTurno, fecha, hora, turno, turnoDB;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, dni = _a.dni, fechaTurno = _a.fechaTurno, horaTurno = _a.horaTurno, idProfesional = _a.idProfesional;
                error = false;
                return [4 /*yield*/, Paciente_1.default.find({ dni: dni })];
            case 1:
                pacienteDB = _b.sent();
                return [4 /*yield*/, Profesional_1.default.findById(idProfesional)];
            case 2:
                profesionalDB = _b.sent();
                if (pacienteDB.length == 0) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "No se encuentra el paciente en el sistema"
                        })];
                }
                return [4 /*yield*/, Turno_1.default.find({ estado: "Creado", paciente: pacienteDB[0] })];
            case 3:
                PacienteConTurno = _b.sent();
                if (!(PacienteConTurno.length == 0)) return [3 /*break*/, 7];
                if (!utils_1.default.verify_date(fechaTurno, horaTurno)) return [3 /*break*/, 5];
                fecha = utils_1.default.utc_to_TimeZoneArgentina(fechaTurno);
                hora = Number(horaTurno.slice(0, 2));
                if (hora < 8 || hora > 21) {
                    return [2 /*return*/, res.status(400).json({
                            message: "No es posible crear el turno a ese horario, debido a que no es horario de atencion"
                        })];
                }
                turno = new Turno_1.default({
                    fechaTurno: fecha,
                    horaTurno: horaTurno,
                    fechaCreacion: utils_1.default.dateNowUTC_to_TimeZoneArgentina(),
                    estado: "Creado",
                    paciente: pacienteDB[0],
                    profesional: profesionalDB
                });
                return [4 /*yield*/, turno.save().catch(function (err) {
                        error = true;
                        res.status(400).json({
                            err: err
                        });
                    })];
            case 4:
                turnoDB = _b.sent();
                if (!error) {
                    res.json({
                        turnoDB: turnoDB
                    });
                }
                return [3 /*break*/, 6];
            case 5: return [2 /*return*/, res.status(400).json({
                    err: true,
                    message: "La fecha que selecciono es incorrecto o la hora es incorrecto"
                })];
            case 6: return [3 /*break*/, 8];
            case 7:
                res.status(400).json({
                    err: true,
                    message: "Usted ya posee un turno"
                });
                _b.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
routes.get('/buscarTurnos/:fecha', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fechaTurno, fecha;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fechaTurno = req.params.fecha;
                fecha = utils_1.default.utc_to_TimeZoneArgentina(fechaTurno);
                return [4 /*yield*/, Turno_1.default.find({ fechaTurno: fecha }).exec(function (err, turnosDB) {
                        if (err) {
                            return res.status(400).json({
                                message: "Formato incorrecto por favor introduzca la fecha en formato yyyy-mm-dd"
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
routes.get('/buscarTurno/:idPaciente', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idPaciente;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idPaciente = req.params.idPaciente;
                return [4 /*yield*/, Turno_1.default.find({ paciente: idPaciente }).populate({ path: "paciente" }).populate({ path: "profesional" }).exec(function (err, turnosDB) {
                        if (err) {
                            return res.status(400).json({
                                message: "No se un turno relacionado con el paciente"
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
routes.put('/actualizarTurno/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, fechaTurno, horaTurno, fecha;
    return __generator(this, function (_b) {
        id = req.params.id;
        _a = req.body, fechaTurno = _a.fechaTurno, horaTurno = _a.horaTurno;
        if (utils_1.default.verify_date(fechaTurno, horaTurno)) {
            fecha = utils_1.default.utc_to_TimeZoneArgentina(fechaTurno);
            Turno_1.default.findByIdAndUpdate(id, { fechaTurno: fecha, horaTurno: horaTurno, fechaCreacion: utils_1.default.dateNowUTC_to_TimeZoneArgentina() }, { new: true, runValidators: true }, function (err, turnoDB) {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: err
                    });
                }
                if (!turnoDB) {
                    return res.status(400).json({
                        error: true,
                        message: "El turno no se modifico con exito, por favor vuelva a intentarlo"
                    });
                }
                else {
                    return res.json({
                        message: "El turno se actualizo con exito",
                        turnoDB: turnoDB
                    });
                }
            });
        }
        return [2 /*return*/];
    });
}); });
routes.delete('/borrarTurno/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        Turno_1.default.findByIdAndUpdate(id, { estado: "Vencido" }, { new: true, runValidators: true }, function (err, turnoDB) {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: err
                });
            }
            if (!turnoDB) {
                return res.status(400).json({
                    error: true,
                    message: "El turno no se modifico con exito, por favor vuelva a intentarlo"
                });
            }
            else {
                return res.json({
                    message: "Se dio de baja con exito",
                    turnoDB: turnoDB
                });
            }
        });
        return [2 /*return*/];
    });
}); });
exports.default = routes;
//# sourceMappingURL=routesTurno.js.map