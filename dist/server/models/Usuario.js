"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var usuarioSchema = new Schema({});
exports.default = mongoose_1.default.model("Usuario", usuarioSchema);
//# sourceMappingURL=Usuario.js.map