"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TurnoControl = /** @class */ (function () {
    function TurnoControl() {
    }
    Object.defineProperty(TurnoControl, "getInstance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    return TurnoControl;
}());
exports.default = TurnoControl;
