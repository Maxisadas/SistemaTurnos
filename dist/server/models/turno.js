"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var turnoSchema = new Schema({
    fechaTurno: { type: Date },
    horaTurno: { type: String },
    fechaCreacion: { type: Date, unique: true },
    estado: { type: String },
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' },
    profesional: { type: Schema.Types.ObjectId, ref: 'Profesional' }
});
exports.default = mongoose_1.default.model("Turno", turnoSchema);
//# sourceMappingURL=Turno.js.map