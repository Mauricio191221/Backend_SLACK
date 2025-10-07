import { validarId } from '../utils/validations.utils.js';
import UserRepository from '../repositories/User.repository.js';
import { ServerError } from '../utils/customError.utils.js';

class UserController{
    static  async getAll (request, response){
        try{
            const users = await UserRepository.getAll()
            response.status(200).json(
                {
                    ok: true,
                    status: 200,
                    message: 'Usuarios obtenidos',
                    users: users
                }
            )
        }
        catch(error){
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

    static async getById (request, response){
        try{
            const user_id = request.params.user_id
            if(validarId(user_id)){
                const user = await UserRepository.getById(user_id)
                if(!user){
                    throw new ServerError (400, `User con ID ${user_id} es invalido`)
                }
                else{
                    return response.status(200).json(
                        {
                            ok: true,
                            status: 200,
                            message: `User con ID ${user_id} encontrado`,
                            data: {
                                user: user
                            }
                        }
                    )
                }
            }
            else{
                throw new ServerError(400, `El ID ingresado es invalido`)
            }
        }
        catch(error){
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

export default UserController