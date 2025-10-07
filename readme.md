Clase 13
import ENVIROMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";
import UserRepositoy from './repositories/User.repository.js';
import WorkspaceRepository from "./repositories/Workspace.repository.js";
import { validarId } from "./utils/validations.utils.js";
import mongoose from "mongoose";


connectMongoDB()

import express, { request, response } from 'express'
//Crea una aplicacion de express o servidor web 
const app = express()

app.get('/', (request, response) => {
    response.send('Hello World!')
})


app.get('/test', (request, response) => {
    response.send<!-- ('<h1>Hola</h1>') -->
})

/* app.get() nos permite configurar un endpoint en nuestro servidor
    - Primer parametro: string, que representa el endpoint que estamos configurando
    - Segundo parametro: Callback fn que es la accion que se ejecutara cuando suceda la consulta 
        - Esta funcion puede ser async en caso de ser necesario. 
        -Esa funcion recibe siempre 2 parametros(Que son dados por express), request y response
            - request: Es un objeto con la configuracion de la consulta
            - response: Es un pbjeto con la configuracion de la respuesta
                - response.send() es una valor que nos permite enviar un valor como respuesta de servidor -. Puede ser un string o un objeto, en caso de ser un objeto sera transformado a JSON
                - (RECOMENDADO): Si vas a responder un JSON deberias usar mejor response.json()
*/

app.get(
    '/users',
    async (request, response) => {
        const users = await UserRepositoy.getAll()
        response.json(
            {
                ok: true,
                message: 'Usuarios obtenidos',
                users: users
            }
        )
    }
)


//Cuando me consulten en esta direccion respondere con la lista de espacios guardada en mi DB
app.get(
    '/workspaces',
    async (request, response) => {
        const workspaces = await WorkspaceRepository.getAll()
        response.json(
            {
                ok: true,
                message: "Workspaces encontrados",
                workspaces: workspaces
            }
        )
    }
)

//Cuando consulten en esta direccion respondere con el workspace guardado en mi DB con ese ID
//Route param, URL param
/* app.get(
    '/workspaces/:workspace_id',
    async ( request, response ) => {
        //Es un objeto donde estan los valores de parametros de busqueda
        //EJEMPLO:
        //Si la ruta es '/workspaces/:workspaces_id'
        //Entonces request.params sera: {workspace_id: valor_workspace_id (siempre sera un string)}
        //Paso 1: capturar el ID
        const workspace_id = request.params.workspace_id
        console.log('El ID buscado es',workspace_id)

        //Paso 2: Validar el ID
        //IMPORTANTE: Siempre la funcion que controla la consulta debe responder 

    if(validarId(workspace_id)){
        //Paso 3: Buscamos en DB
        const workspace = await WorkspaceRepository.getById(workspace_id)
        //Paso 4: Validamos si se encontro 
        if(!workspace){
            return response.json(
                {
                    ok: false,
                    message: `Workspace con ID ${workspace_id} no encontrado `
                }
            )
        }
        else{
            return response.json(
                {
                    ok: true,
                    message:`Workspace con ID ${workspace_id} obtenido` ,
                    data: {
                        workspace: workspace
                    }
                }
            )
        }
    }
    else{
        return response.json(
            {
                ok: false,
                message: "Workspace_id debe ser un ID valido"
            }
        )
    }
    }
) */


app.get(
    '/users/:user_id',
    async (request, response) => {
        const user_id = request.params.user_id
        if(validarId(user_id)){
            const user = await UserRepositoy.getById(user_id)
            if(!user){
                return response.json(
                    {
                        ok: false,
                        message: <!-- `User con ID ${user_id} es invalido` -->
                    }
                )
            }
            else{
                return response.json(
                    {
                        ok: true,
                        message: <!-- `User con ID ${user_id} encontrado` -->,
                        data: {
                            user: user
                        }
                    }
                )
            }
        }
        else{
            return response.json(
                {
                    ok: false,
                    message: 'ID invalido'
                }
            )
        }
    }
)


//.listen() es un metodo para asignar un lugar donde nuestro servidor se ejecutara

//Primer parametro: Numero de puerto donde se ejecutara el servidor
//Segundo parametro: Una Callback fn que se ejecutara si logra prender correctamente en esa direccion mi servidor
import workspace_router from "./Routes/Workspace.route.js";

app.listen(
    8080,
    () => {
        console.log("Server en funcionamiento")
    }
)

Esto era el server clase 13