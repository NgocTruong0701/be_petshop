'use strict'
import KeyToken from "../models/keytoken.model.js";

export default class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            //// level 9
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
}