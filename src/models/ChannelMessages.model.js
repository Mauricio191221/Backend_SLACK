import mongoose from "mongoose";

const channelMessageSchema = new mongoose.Schema({
    channel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Members",
        required: true
    },
    content:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
})

const ChannelMessage = mongoose.model('ChannelMessages', channelMessageSchema)
export default ChannelMessage