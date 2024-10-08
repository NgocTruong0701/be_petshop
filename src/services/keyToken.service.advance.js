'use strict'
import KeyToken from "../models/keytoken.model.js";

export default class KeyTokenServiceAdvance {
    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString();
            const tokens = await KeyToken.create({
                user: userId,
                publicKey: publicKeyString,
            });

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    }
}