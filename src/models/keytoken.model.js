'use strict'

import mongoose, { Schema } from "mongoose";

const DOCUMENT_NAME = 'KeyToken';
const COLLECTION_NAME = 'KeyTokens';

const keyTokenSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    publicKey: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
    refreshTokensUsed: {
        type: Array,
        default: [] // the refresh token used 
    },
    refreshTokens: {
        type: String,
        required: true,
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

const KeyToken = mongoose.model(DOCUMENT_NAME, keyTokenSchema);

export default KeyToken;