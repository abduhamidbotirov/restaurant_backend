import mongoose, {
    Types
} from "mongoose"

// Define the schema for the workers table
const WorkerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
    },
    userInfo: {
        type: String,
    },
    workingTime: {
        type: String,
    },
    userPhoto: {
        type: String,
    },
    salary: {
        type: String,
    },
    rol: {
        type: String,
    },
    res_id: {
        type: Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the users model from the schema
const Worker = mongoose.model('Worker', WorkerSchema);

export default Worker;