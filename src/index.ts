require('./server/config/config');
import Server from './server/server';
import routesTurno from './server/routes/routesTurno';

const server = Server.init(Number(process.env.PORT));

server.app.use(routesTurno);

server.start(() => {

    console.log("Servidor corriendo en el puerto: ",process.env.PORT);
});

