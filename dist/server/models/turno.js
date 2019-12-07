"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var turnoSchema = new Schema({
    fechaTurno: { type: Date },
    fechaCreacion: { type: Date, unique: true },
    numeroTurno: { type: Number, unique: true },
    estado: { type: String },
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' }
});
exports.default = mongoose_1.default.model("Turno", turnoSchema);
