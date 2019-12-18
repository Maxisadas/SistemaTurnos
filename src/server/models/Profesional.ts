import mongoose from "mongoose";

var Schema = mongoose.Schema;

var profesionalSchema = new Schema({
    nombre:{type:String},
    apellido:{type:String},
    especialidad:{type:String}
    
});

export default mongoose.model("Profesional",profesionalSchema);