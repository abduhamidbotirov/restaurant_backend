import mongoose, {
    Types
} from "mongoose";
const {
    Schema
} = mongoose;

const zakazSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    num_people: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    res_id: {
        type: Types.ObjectId,
        required: true,
        ref: "Restaurant"
    }
});

export default mongoose.model('Zakaz', zakazSchema);