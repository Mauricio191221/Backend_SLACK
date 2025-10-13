import transporter from "../config/mailer.config.js";
import UserRepository from "../repositories/User.repository.js"
import { ServerError } from "../utils/customError.utils.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import ENVIROMENT from "../config/environment.config.js";



class AuthService{

    static async register(username, password, email){
        console.log(username, password, email)
        //verifica el email
        const user_found = await UserRepository.getByEmail(email)
        if(user_found){
            throw new ServerError(400, 'Email ya esta en uso')
        }
        //Encriptar contraseña
        const password_hashed = await bcrypt.hash(password, 12)

        //Guardamos en la DB
        const user_created = await UserRepository.createUser(username, email, password_hashed)
        const verification_token = jwt.sign(
            {
                email: email,
                user_id: user_created._id
            },
            ENVIROMENT.JWT_SECRET_KEY
        )
        //Enviar mail de verificacion
        await transporter.sendMail(
            {
                from: 'mauriciodevtest00@gmail.com',
                to: 'mauriciodevtest00@gmail.com',
                subject: 'Verificacion de correo electronico',
                html: `
                <h1>Verificacion.js</h1>
                <p>Este es un mail de verificacion</p>
                <a href='${ENVIROMENT.URL_API_BACKEND}/api/auth/verify-email/${verification_token}'>Verifique el email</a>
                `
            }
        )
    }

    static async verifyEmail(verification_token){
        try{
        const payload = jwt.verify(verification_token, ENVIROMENT.JWT_SECRET_KEY)
        console.log(payload)

        await UserRepository.updateById(
            payload.user_id,
            {
                verified_email: true
            }
        )

        return

        }
        catch(error){
            if(error instanceof jwt.JsonWebTokenError){
                throw new ServerError (400, 'Token invalido')
            }
            throw error
        }
    }


    static async login(email, password){
        /* 
        - Buscar por email y guardar una variable
            - No se encuentro: Tirmaos error 400 email no registrado
        -Usamos bycrypt.compare para chekear que las password recibida sea igual al hash guardado en la db
            -En caso de que no sean igual: status 401(unauthorized) Email o password son invalidos
        -Generar el authorization token con los datos que consideremos importantes para una sesion: (name, email, rol, created_At)(No pasar datos sensibles)
        -retornar el token 
        */
        const user = await UserRepository.getByEmail(email)
        if(!user){
            throw new ServerError(404, 'Email no registrado')
        }

        if(user.verified_email === false){
            throw new ServerError(401, 'Email no verificado')
        }

        /* Permitir saber si cierto valor es igual a otro valor encriptado */
        const is_same_password = await bcrypt.compare(password, user.password)
        if(!is_same_password){
            throw new ServerError(401, 'Password incorrecta')
        }
        const authorization_token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                created_at: user.create_at,
            },
            ENVIROMENT.JWT_SECRET_KEY,
            {
                expiresIn: '7d'
            }
        )

        return {
            authorization_token
        }
    }
}


export default AuthService