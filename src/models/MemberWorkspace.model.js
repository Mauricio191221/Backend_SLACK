import mongoose from "mongoose";

const memberWorspaceSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    workspace:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['admin', 'support', 'user'],
        default: 'user'
    }
})

const MemberWorkspace = mongoose.model('Members', memberWorspaceSchema)
export default MemberWorkspace;