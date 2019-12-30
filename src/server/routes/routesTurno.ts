import {Router,Request,Response} from "express";
import TurnoControl from '../classes/TurnoControl';
import bodyParser from "body-parser";
import Turno from '../models/Turno';
import Paciente from '../models/Paciente';
import utils from '../utils/utils';
import Profesional from "../models/Profesional";



const routes = Router();
// parse application/x-www-form-urlencoded
routes.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
routes.use(bodyParser.json())

routes.post('/crearTurno',async (req:Request, res:Response) =>{

    const {dni,fechaTurno,horaTurno,idProfesional} = req.body;
    let error:Boolean = false;

    let pacienteDB = await Paciente.find({dni});
    let profesionalDB = await Profesional.findById(idProfesional);
    
    if(pacienteDB.length == 0){
        return res.status(400).json({
            error:true,
            message: "No se encuentra el paciente en el sistema"
        })
    }

    let PacienteConTurno =await Turno.find({estado:"Creado",paciente: pacienteDB[0]})

    if(PacienteConTurno.length == 0){
        
        if(utils.verify_date(fechaTurno,horaTurno)){
            let fecha:Date = utils.utc_to_TimeZoneArgentina(fechaTurno);
            let hora:Number = Number(horaTurno.slice(0,2));

            if(hora < 8 || hora > 21){

                return res.status(400).json({
                    message:"No es posible crear el turno a ese horario, debido a que no es horario de atencion"
                });

            }
            let turno = new Turno({
                fechaTurno: fecha,
                horaTurno,
                fechaCreacion: utils.dateNowUTC_to_TimeZoneArgentina(),
                estado: "Creado",
                paciente: pacienteDB[0],
                profesional: profesionalDB
            });
        
            let turnoDB = await turno.save().catch((err)=> {
                error = true;
                res.status(400).json({
                    err
                });
            });
        
            if(!error){
                res.json({
                    turnoDB
                });
    
            }

        }else{
            return res.status(400).json({
                err:true,
                message:"La fecha que selecciono es incorrecto o la hora es incorrecto"
            })
        }
    
        

    }else{

        res.status(400).json({
            err:true,
            message:"Usted ya posee un turno"
        })

    }




});

routes.get('/buscarTurnos/:fecha',async (req:Request, res:Response) =>{

    let fechaTurno = req.params.fecha;
    let fecha:Date = utils.utc_to_TimeZoneArgentina(fechaTurno);

    await Turno.find({fechaTurno: fecha}).exec((err,turnosDB) => {

        if(err){
            return res.status(400).json({
                message:"Formato incorrecto por favor introduzca la fecha en formato yyyy-mm-dd"
            })
        }
        res.json({
            turnosDB
        });

    });


        
});

routes.get('/buscarTurno/:idPaciente',async (req:Request, res:Response) =>{

    let idPaciente = req.params.idPaciente;
 

    await Turno.find({paciente:idPaciente}).populate({path:"paciente"}).populate({path:"profesional"}).exec((err,turnosDB) => {

        if(err){
            return res.status(400).json({
                message:"No se un turno relacionado con el paciente"
            })
        }
        res.json({
            turnosDB
        });

    });


        
});



routes.put('/actualizarTurno/:id',async (req:Request,res:Response) =>{

    const id = req.params.id;
    const {fechaTurno,horaTurno} = req.body;
    
    if(utils.verify_date(fechaTurno,horaTurno)){
        let fecha = utils.utc_to_TimeZoneArgentina(fechaTurno);

        Turno.findByIdAndUpdate(id,{fechaTurno: fecha,horaTurno,fechaCreacion: utils.dateNowUTC_to_TimeZoneArgentina()},{new:true,runValidators:true}, (err,turnoDB) =>{
        
            if(err){
                return res.status(400).json({
                    error:true,
                    message: err
                })
            }

            if(!turnoDB){
                return res.status(400).json({
                    error:true,
                    message: "El turno no se modifico con exito, por favor vuelva a intentarlo"
                })
            }else{

                return res.json({
                    message:"El turno se actualizo con exito",
                    turnoDB
                })
            }

        });
    }
    

});

routes.delete('/borrarTurno/:id',async (req:Request,res:Response) =>{

    const id = req.params.id;

    Turno.findByIdAndUpdate(id,{estado:"Vencido"},{new:true,runValidators:true}, (err,turnoDB) =>{
    
        if(err){
            return res.status(400).json({
                error:true,
                message: err
            })
        }

        if(!turnoDB){
            return res.status(400).json({
                error:true,
                message: "El turno no se modifico con exito, por favor vuelva a intentarlo"
            })
        }else{

            return res.json({
                message: "Se dio de baja con exito",
                turnoDB
            })
        }

    });
    
    

});

export default routes;