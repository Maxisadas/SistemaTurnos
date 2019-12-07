require('../config/config');
import mongoose from "mongoose";
import { MongoError } from "mongodb";


const conexionBD = async() => {
   

    await mongoose.connect(String(process.env.urlDB), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },(err:MongoError) => {
        if(err){
            console.log(err);
        }else{

            console.log("DB CONNECTED");
        }

    });

}

export default conexionBD;