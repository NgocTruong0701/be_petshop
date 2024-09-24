import mongoose, { Schema } from "mongoose";

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    password: {
        type: String,
        required: true,
    },
    verify: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

const User = mongoose.model(DOCUMENT_NAME, userSchema);

export default User;