import {Router,Request,Response} from "express";
import TurnoControl from '../classes/TurnoControl';
import bodyParser from "body-parser";
import Turno from '../models/Turno';
import Paciente from '../models/Paciente';
import utils from '../utils/utils';



const routes = Router();
// parse application/x-www-form-urlencoded
routes.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
routes.use(bodyParser.json())

routes.post('/crearTurno',async (req:Request, res:Response) =>{

    const {dni,fechaTurno,horaTurno} = req.body;
    let error:Boolean = false;

    let pacienteDB = await Paciente.find({dni});

    if(pacienteDB.length == 0){
        return res.status(400).json({
            error:true,
            message: "No se encuentra el paciente en el sistema"
        })
    }

    let PacienteConTurno =await Turno.find({estado:"Creado",paciente: pacienteDB[0]})

    if(PacienteConTurno.length == 0){
        
        if(utils.verify_date(fechaTurno,horaTurno)){
            let fecha = utils.utc_to_TimeZoneArgentina(fechaTurno,horaTurno);

            let turno = new Turno({
                fechaTurno: fecha,
                fechaCreacion: utils.dateNowUTC_to_TimeZoneArgentina(),
                estado: "Creado",
                paciente: pacienteDB[0]
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

routes.get('/buscarTurno/:id',async (req:Request, res:Response) =>{

    let idPaciente = req.params.id;

    await Turno.find({paciente: idPaciente}).populate('paciente','nombre apellido').exec((err,turnosDB) => {

        if(err){
            return res.status(400).json({
                message:"El paciente no existe"
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
        let fecha = utils.utc_to_TimeZoneArgentina(fechaTurno,horaTurno);

        Turno.findByIdAndUpdate(id,{fechaTurno: fecha,fechaCreacion: utils.dateNowUTC_to_TimeZoneArgentina()},{new:true,runValidators:true}, (err,turnoDB) =>{
        
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