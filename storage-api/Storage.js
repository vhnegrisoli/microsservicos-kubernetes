import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const StorageSchema = new Schema({
    data: {
        type: Object,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    originService: {
        type: String,
        required: true,
    },
    currentService: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    }
});

export default model("Storage", StorageSchema);