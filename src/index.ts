require('./server/config/config');
import Server from './server/server';
import routesTurno from './server/routes/routesTurno';
import routesPaciente from './server/routes/routesPaciente';
import routesProfesional from './server/routes/routesProfesional';

const server = Server.init(Number(process.env.PORT));

server.app.use(routesTurno);
server.app.use(routesPaciente);
server.app.use(routesProfesional);

server.start(() => {

    console.log("Servidor corriendo en el puerto: ",process.env.PORT);
});

