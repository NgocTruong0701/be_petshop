'use strict'

import mongoose, { Schema } from 'mongoose';

const DOCUMENT_NAME = 'Apikey';
const COLLECTION_NAME = 'Apikeys';

const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    permissions: {
        type: [String],
        required: true,
        enum: ['0000', '1111', '2222'],
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
});

export default mongoose.model(DOCUMENT_NAME, apiKeySchema);
