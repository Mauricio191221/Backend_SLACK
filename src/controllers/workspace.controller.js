//Las funciones que se encargaran de maanejar la consulta y la respuesta 
import WorkspaceRepository from '../repositories/Workspace.repository.js';
import { validarId } from '../utils/validations.utils.js';
import { ServerError } from '../utils/customError.utils.js';

class WorkspaceController{
    static async post (request, response){
    try{
        //request.body es donde estara la carga util enviada por el cliente 
        //Si hicimos express.json() en nuestra app body siempre sera de tipo objeto
        const name = request.body.name
        if(!name || typeof(name) !== 'string' || name.length > 30){
            /* return response.status(400).json(
                {
                    ok: false,
                    status: 400,
                    message: 'El nombre es invalido'
                }
            ) */
            throw new ServerError(400, "El campo 'name' no puede estar vacio y debe ser un string de menos de 30 caracteres")
        }
        else{
                await WorkspaceRepository.createWorkspace(name, '')
                return response.status(201).json(
                    {
                        ok: true,
                        status: 201,
                        message: 'Workspace creado con exito'
                    }
                )
            }
        }
        catch(error){
            console.log(error)
            //Evaluamos si es un error que nosotros definimos 
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

    static async getById (request, response) {
    try{
        const workspace_id = request.params.workspace_id
        console.log('El ID buscado es', workspace_id)
            if(validarId(workspace_id)){
                const workspace = await WorkspaceRepository.getById(workspace_id)
                if(!workspace){
                    /* return response.json(
                        {
                            ok: false,
                            message: `Workspace con ID ${workspace_id} no encontrado `
                        }
                    ) */
                    throw new ServerError(404, `Workspace con ID ${workspace_id} no encontrado`)
                }
                else{
                    return response.status(200).json(
                        {
                            ok: true,
                            status: 200,
                            message:`Workspace con ID ${workspace_id} obtenido` ,
                            data: {
                                workspace: workspace
                            }
                        }
                    )
                }
            }
            else{
                throw new ServerError(400, "El ID ingresado es invalido")
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

    static async getAll (request, response) {
        try{
            const workspaces = await WorkspaceRepository.getAll()
            return response.status(200).json(
                {
                    ok: true,
                    status: 200,
                    message: "Workspaces encontrados",
                    workspaces: workspaces
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


}
export default WorkspaceController