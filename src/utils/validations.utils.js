import mongoose from "mongoose"

export function validarId(id){
    //Devolvera verdadero en caso de que el ID sea valido, de lo contrario devolvera false
    return mongoose.isValidObjectId(id)
}
