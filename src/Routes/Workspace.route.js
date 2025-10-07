import express from 'express'
import WorkspaceController from '../controllers/workspace.controller.js';

//aca estamos creando un enrutador de express
const workspace_router = express.Router()


// /api/workspace  se ejecutara esta otra funcion
workspace_router.get('/', WorkspaceController.getAll)

// /api/workspace/:workspace_id
workspace_router.get('/:workspace_id', WorkspaceController.getById)

//Este es el endpoint para crear workspaces
workspace_router.post('/', WorkspaceController.post)

export default workspace_router