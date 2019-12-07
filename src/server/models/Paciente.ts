import mongoose = require("mongoose");

var Schema = mongoose.Schema;

var pacienteSchema = new Schema({
    nombre:{type:String, required: [true,'El nombre es necesario']},
    apellido:{type:String,required: [true,'El apellido es necesario']},
    dni:{type:String,required: [true,'El dni es necesario'],unique:true},
    edad:{type:Number,required:true}
});

export default mongoose.model('Paciente',pacienteSchema);