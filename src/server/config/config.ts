
// CONFIGURACION DE PUERTO.
process.env.PORT = process.env.PORT || "3000";

//BASE DE DATOS
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
let urlDB:String= "";

if(process.env.NODE_ENV==='dev'){
    urlDB = 'mongodb://localhost/sistemaTurnos';

}else{

    urlDB = String(process.env.MONGO_URI);
}

process.env.urlDB = String(urlDB);