import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    workspace:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    private: {
        type: Boolean,
        default: true, 
    },
    active:{
        type: Boolean,
        default: true
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    modified_at:{
        type: Date,
        default: null
    }
}
)

const Channels = mongoose.model('Channel', channelSchema)

export default Channels