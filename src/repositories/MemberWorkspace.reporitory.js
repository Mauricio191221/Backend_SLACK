import MemberWorkspace from "../models/MemberWorkspace.model.js";
import { ServerError } from "../utils/customError.utils.js";

class MemberWorkspaceRepository {
    static async getAllWorkspacesByUserId (user){
        //Traer todos los workspace de los que soy miembro
        const workspaces_que_soy_miembro = await MemberWorkspace
        .find({user: user})
        .populate({
            path: 'workspace',
            match: {active: true}
        }) //Expandimos la propiedad de workspace, para que nos traiga el workspace completo

        console.log(workspaces_que_soy_miembro)
    }

    static async getMemberWorkspaceByUserIdAndWorkspaceId(user, workspace){
        const member_workspace = await MemberWorkspace.findOne({user: user, workspace: workspace})
        return member_workspace
    }

    static async addMember(user, workspace, role = 'member'){
        const member = await MemberWorkspaceRepository.getMemberWorkspaceByUserIdAndWorkspaceId(user, workspace)
        if(member){
            throw new ServerError(400, 'El usuario ya es miembro del workspace')
        }
        await MemberWorkspace.insertOne({user: user, workspace: workspace, role: role})
    }

    static async getById(member_id){
        const member_found = await MemberWorkspace.findById(member_id)
        return member_found
    }

        static async getAll(){
        const allMemberWorkspace = await MemberWorkspace.find()
        return allMemberWorkspace
    }

    static async updateById(){
        const member_update = await MemberWorkspace.findByIdAndUpdate(
            member_id,
            new_values,
            {
                new: true
            }
        )
        return member_update
    }
    
    static async deleteById(member_id){
        await MemberWorkspace.findByIdAndDelete(member_id)
        return true
    }

}

export default MemberWorkspaceRepository