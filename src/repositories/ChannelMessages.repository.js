import ChannelMessage from "../models/ChannelMessages.model.js";

class ChannelMessageRepository {
        static async sendMessage(channel, sender, content){
        await ChannelMessage.insertOne({
            channel: channel,
            sender: sender,
            content: content
        })
    }

    static async getAll(){
        const allChannelMessages = await ChannelMessage.find()
        return allChannelMessages
    }

    static async getById(channelMessage_id){
        const channelMessage_found = await ChannelMessage.findById(channelMessage_id)
        return channelMessage_found
    }

    static async updateById(channelMessage_id, new_values){
        const channelMessage_update = await ChannelMessage.findByIdAndUpdate(
            channelMessage_id,
            new_values,
            {
                new: true
            }
        )
        return channelMessage_update
    }

    static async deleteById(channelMessage_id){
        await ChannelMessage.findByIdAndDelete(channelMessage_id)
        return true
    }
}

export default ChannelMessageRepository