import mongoose from "mongoose";


var Schema = mongoose.Schema;

var turnoSchema = new Schema({
    fechaTurno: {type:Date},
    fechaCreacion: {type:Date, unique:true},
    estado:{type:String},
    paciente:{type:Schema.Types.ObjectId, ref:'Paciente'},
    profesional:{type:Schema.Types.ObjectId, ref:'Profesional'}

});


export default mongoose.model("Turno",turnoSchema);