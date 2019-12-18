"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var profesionalSchema = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    especialidad: { type: String }
});
exports.default = mongoose_1.default.model("Profesional", profesionalSchema);
//# sourceMappingURL=Profesional.js.map