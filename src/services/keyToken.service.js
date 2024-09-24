'use strict'
import KeyToken from "../models/keytoken.model";

export default class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString();
            const tokens = await KeyToken.create({
                user: userId,
                publicKey: publicKeyString,
            });

            return tokens ? publicKey : null;
        } catch (error) {
            return error;
        }
    }
}