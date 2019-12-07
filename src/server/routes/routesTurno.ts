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

    const {nombre,apellido,dni,edad,fechaTurno,horaTurno} = req.body;

    let pacienteDB;
    let error:Boolean = false;

    let pacienteEncontrado = await Paciente.find({dni});
    if(pacienteEncontrado.length > 0 ){
        pacienteDB = pacienteEncontrado[0];

    }else{
        let paciente = new Paciente({
            nombre,
            apellido,
            dni,
            edad
        });
    
    
        pacienteDB = await paciente.save().catch( (err)=>{
            error = true;
            res.status(400).json({
                err
            });
            
        });

    }

    if(!error){
        
        if(utils.verify_date(fechaTurno,horaTurno)){
            let fecha = utils.utc_to_TimeZoneArgentina(fechaTurno,horaTurno);

            let turno = new Turno({
                fechaTurno: fecha,
                fechaCreacion: utils.dateNowUTC_to_TimeZoneArgentina(),
                estado: "Creado",
                paciente: pacienteDB
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
            res.status(400).json({
                err:true,
                message:"La fecha que selecciono es incorrecto o la hora es incorrecto"
            })
        }

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


export default routes;