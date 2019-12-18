"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('./server/config/config');
var server_1 = __importDefault(require("./server/server"));
var routesTurno_1 = __importDefault(require("./server/routes/routesTurno"));
var routesPaciente_1 = __importDefault(require("./server/routes/routesPaciente"));
var routesProfesional_1 = __importDefault(require("./server/routes/routesProfesional"));
var server = server_1.default.init(Number(process.env.PORT));
server.app.use(routesTurno_1.default);
server.app.use(routesPaciente_1.default);
server.app.use(routesProfesional_1.default);
server.start(function () {
    console.log("Servidor corriendo en el puerto: ", process.env.PORT);
});
//# sourceMappingURL=index.js.map