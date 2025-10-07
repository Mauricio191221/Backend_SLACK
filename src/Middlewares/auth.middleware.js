import { request, response } from "express";
import { ServerError } from "../utils/customError.utils.js";
import jwt from 'jsonwebtoken'
import ENVIROMENT from "../config/environment.config.js";

//El token de autorizacion se suele pasar por header. Especoficamente por el header 'Authorization'
// Formato esperado 'Bearer token_value'

const authMiddleware = (request, response, next) => {
    try{
        const authorization_header = request.headers.authorization
            if(!authorization_header){
                throw new ServerError(400, 'No hay header de autorizacion')
            }
        const auth_token = authorization_header.split(' ').pop()
            if(!auth_token){
                new ServerError(400, 'No hay token de autorizacion')
            }

            const user_data = jwt.verify(auth_token, ENVIROMENT.JWT_SECRET_KEY)

            //Guardamos los datos del tokwn wn la request, cosa de que otros cotroladores puedan acceder a quien es el usuario
            request.user = user_data
            next()
        }
    catch(error){
            console.log(error)
            if(error instanceof jwt.JsonWebTokenError){
                return response.status(401).json(
                    {
                        ok:false,
                        status:401,
                        message: 'Token invalido'
                    }
                )
            }
            else if(error instanceof jwt.JsonWebTokenError){
                return response.status(401).json(
                    {
                        ok:false,
                        status:401,
                        message: 'Token expirado'
                    }
                )
            }
            if(error.status){
                return response.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else{
                return response.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: 'Error interno del servidor'
                    }
                )
            }
        }
    }

    export default authMiddleware