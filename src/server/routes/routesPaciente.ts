import {Router,Request,Response} from "express";
import bodyParser from "body-parser";
import Paciente from "../models/Paciente";





const routes = Router();

// parse application/x-www-form-urlencoded
routes.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
routes.use(bodyParser.json())

routes.post("/crearPaciente",async (req:Request,res:Response) => {
    const {nombre,apellido,dni,edad} = req.body;

    let pacienteDB;
    let pacienteEncontrado = await Paciente.find({dni});

    if(pacienteEncontrado.length > 0 ){
        return res.status(400).json({
            err:true,
            message:"Este paciente ya existe en el sistema"
        });

    }else{
        let error:Boolean = false;
        let paciente = new Paciente({
            nombre,
            apellido,
            dni,
            edad
        });
    
    
        pacienteDB = await paciente.save().catch( (err)=>{
            error = true;
            return res.status(400).json({
                err
            });
            
        });

        if(!error){
            return res.status(200).json({
                message: "El paciente se creo con exito",
                pacienteDB
            });
        }
        
    }



});

routes.put("/actualizarPaciente/:id", (req:Request,res:Response) => {

    const{nombre,apellido,dni,edad} = req.body;
    const id = req.params.id;

    Paciente.findByIdAndUpdate(id,{nombre,apellido,dni,edad},{new:true,runValidators:true}, (err,pacienteDB)=>{
        
        if(err){
            return res.status(400).json({
                error:true,
                message: err
            });
            
        }else{
            if(pacienteDB){
                return res.json({
                    message:"Se ha modificado con exito",
                    pacienteDB
                });

            }else{
                return res.json(400).json({
                    error:true,
                    message:"No se encontro al paciente"
                })
            }
            
        }

        

    });



});

routes.post("/buscarPaciente",async (req:Request,res:Response) => {

    const {dni} = req.body;

    let pacienteDB = await Paciente.find({dni});

    

    if(pacienteDB.length>0){
        let paciente = pacienteDB[0];
        return res.json({
            paciente
        })

    }else{
        return res.status(400).json({
            message:"Este paciente no existe en el sistema"
        });
    }



});



export default routes;