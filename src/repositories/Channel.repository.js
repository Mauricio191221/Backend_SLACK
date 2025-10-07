import Channels from "../models/Channel.model.js";

class ChannelRepository {

    static async createChannel(name, workspace, private){
        await Channels.insertOne({
            name: name,
            workspace: workspace,
            private: private
        })
    }

    static async getAll(){
        const channels = await Channels.find()
        return channels
    }

    static async getById(channel_id){
        const channel_found = await Channels.findById(channel_id)
        return channel_found
    }

    static async updateById(channel_id, new_values){
        const channel_update = await Channels.findByIdAndUpdate(
            channel_id, 
            new_values,
            {
                new: true
            }
        )
        return channel_update
    }

    static async deleteById(channel_id){
        await Channels.findByIdAndDelete(channel_id)
        return true
    }
}

export default ChannelRepository