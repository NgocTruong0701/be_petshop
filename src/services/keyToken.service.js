'use strict'
import KeyToken from "../models/keytoken.model.js";

export default class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const tokens = await KeyToken.create({
                user: userId,
                publicKey,
                privateKey,
            });

            return tokens ? tokens : null;
        } catch (error) {
            return error;
        }
    }
}