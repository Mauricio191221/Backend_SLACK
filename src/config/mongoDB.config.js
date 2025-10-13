import mongoose from "mongoose"
import ENVIROMENT from "./environment.config.js"

async function connectMongoDB() {
    try{
        await mongoose.connect(ENVIROMENT.MONGO_DB_CONNECTION_STRING,{
            timeoutMS: 60000
        })
        console.log('Conexion con MongoDB exitosa')
    }
    catch(error){
        console.error('La conexion con MongoDB fallo')
        console.log(error)
    }
}

export default connectMongoDB