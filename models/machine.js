import mongoose from "mongoose";

const MachineShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        imageUrl: String,
        condition: {
            type: Boolean,
            required: true,
            default: false, 
        }
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Part', MachineShema);