import mongoose from "mongoose";

//El esquema tiene los "contratos" de que es un User que luego podremos asignarselo a la coleccion de usuarios
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        verified_email: {
            type: Boolean,
            required: true,
            default: false
        },
        create_at:{
            type: Date, 
            default: Date.now
        },
        modified_at: {
            type: Date,
            default: null
        },
        active: {
            type:Boolean, 
            default: true
        }
    }
)

//crear el modelo de user, cada accion que hagamos a la colleccion de user se hara por medio del modelo 

const Users = mongoose.model('User', userSchema)

export default Users