import Workspaces from "../models/Workspace.model.js"

class WorkspaceRepository {

    static async createWorkspace(name, url_img, modified_at, created_at, active ){
        await Workspaces.insertOne({
            name: name,
            url_img: url_img,
            modified_at: modified_at,
            created_at: created_at,
            active: active
        })
    }

    static async getAll(){
        const allWorkspaces = await Workspaces.find()
        return allWorkspaces
    }

    static async getById(workspace_id){
        const workspace_found = await Workspaces.findById(workspace_id)
        return workspace_found
    }

    static async updateById(workspace_id, new_values){
        const workspace_update = await Workspaces.findByIdAndUpdate(
            workspace_id,
            new_values,
            {
                new: true
            }
        )
        return workspace_update
    }

    static async deleteById(workspace_id){
        await Workspaces.findByIdAndDelete(workspace_id)
        return true
    }
}

export default WorkspaceRepository