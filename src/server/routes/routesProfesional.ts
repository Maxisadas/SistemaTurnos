import {Router,Request,Response} from "express"
import bodyParser from "body-parser";
import Profesional from "../models/Profesional";


const routes = Router();

// parse application/x-www-form-urlencoded
routes.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
routes.use(bodyParser.json());

routes.post("/crearProfesional",async (req:Request,res:Response) =>{

    const {nombre,apellido,especialidad} = req.body;
    let error:Boolean = false;
    let profesional = new Profesional({
        nombre,
        apellido,
        especialidad
    });

    await profesional.save().catch((err)=>{
        error= true;
        return res.status(400).json({
            error:true,
            message: err

        });
    });
    if(!error){
        return res.json({
            message:"Se creo el profesional con exito"
        });
    }

});

routes.get("/buscarProfesional", async (req:Request,res:Response)=> {

    let profesionalesDB = await Profesional.find();

    if(profesionalesDB.length > 0){

        return res.json({
            profesionalesDB
        });

    }else{
        return res.status(400).json({
            message: "No hay Profesionales cargados en el sistema"
        })
    }

});

routes.get("/buscarProfesionale/:id", async (req:Request,res:Response)=> {
    const id = req.params.id;
    let profesionalDB = await Profesional.findById(id);

    if(profesionalDB){

        return res.json({
            profesionalDB
        });

    }else{
        return res.status(400).json({
            message: "No hay Profesionales cargados en el sistema"
        })
    }

});




export default routes;