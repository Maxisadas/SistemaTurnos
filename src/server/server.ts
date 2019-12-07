import express = require("express");
import path = require("path");
import conexionBD from './gateways/mongo';

export default class Server {

    public app: express.Application;
    public port: Number;

    constructor(port: Number){
        this.app = express();
        this.port = port;



    }

    static init(port: Number){
        return new Server(port);

    }

    private publicFolder(){
        const publicFolder = path.resolve(__dirname,'../public');

        this.app.use(express.static(publicFolder));

    }

    start(callback : Function){

        this.app.listen(this.port,callback());
        this.publicFolder();
        conexionBD();
    }





}