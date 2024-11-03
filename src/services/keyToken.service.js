'use strict'
import { Types } from "mongoose";
import KeyToken from "../models/keytoken.model.js";

export default class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            //// level 0
            // const tokens = await KeyToken.create({
            //     user: userId,
            //     publicKey,
            //     privateKey,
            // });

            // return tokens ? tokens : null;
            const filter = { user: userId };
            const update = {
                publicKey,
                privateKey,
                refreshTokenUsed: [],
                refreshToken
            };
            const options = {
                upsert: true,
                new: true
            };

            const tokens = await KeyToken.findOneAndUpdate(filter, update, options);

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            console.error('Error in createKeyToken:', error);
            throw error;
        }
    }

    static findByUserId = async (userId) => {
        return await KeyToken.findOne({ user: userId }).lean();
    }

    static removeKeyById = async (id) => {
        return await KeyToken.deleteOne({ _id: id });
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await KeyToken.findOne({ refreshTokensUsed: refreshToken }).lean();
    }

    static findByRefreshToken = async (refreshToken) => {
        return await KeyToken.findOne({ refreshToken }).lean();
    }

    static removeKeyByUserId = async (userId) => {
        return await KeyToken.findByIdAndDelete({ userId: userId });
    }
}
