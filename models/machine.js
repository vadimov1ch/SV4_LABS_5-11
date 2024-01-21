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
            type: String,
            required: true,
            enum: ['working', 'out of order'] 
        }
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Part', MachineShema);