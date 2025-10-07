import { ServerError } from "../utils/customError.utils.js"
import AuthService from "../services/auth.services.js"

class AuthController{
    static async register(request, response) {
        try{
            const {username, email, password} = request.body
            console.log(request.body)

            if(!username){
                throw new ServerError(400, 'El nombre de usuario es invalido')
            }

            else if(!email && !String(email).toLowerCase().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                throw new ServerError(400, 'El email es invalido')
            }

            else if(!password || password.length < 8){
                throw new ServerError(400, 'La contraseña es invalida')
            }

            await AuthService.register(username, password, email)

            return response.json(
                {
                    ok: true,
                    status: 200,
                    message: 'Registrado con exito!'
                }
            )
        }
        catch(error){
            console.log(error)
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

    static async login(request, response){
        try{
            const {email, password} = request.body

            /* 
            Validar que el email y la password sea valida
            */
            const {authorization_token} = await AuthService.login(email, password)
            return response.json(
                {
                    ok: true, 
                    message: 'Logeado con exito',
                    status: 200,
                    data:{
                        authorization_token: authorization_token
                    }
                }
            )
        }
        catch(error){
            console.log(error)
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

    static async verifyEmail(request, response){
        try{
            const {verification_token} = request.params
            await AuthService.verifyEmail(verification_token)

            response.json(
                {
                    ok: true,
                    status: 200,
                    message: 'Usuario validado'
                }
            )
        }
        catch(error){
            console.log(error)
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
}

export default AuthController