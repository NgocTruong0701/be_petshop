'use strict'
import JWT from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import HEADER from '../constants/header.const.js';
import { NotFoundError, UnauthorizedError } from '../core/error.response.js';
import KeyTokenService from '../services/keyToken.service.js';

const createToken = (payload, key, expiresIn) => {
    return JWT.sign(payload, key, {
        expiresIn,
    });
};

export const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error(`Error verify:: ${err}`);
                reject(err);
            } else {
                console.log(`Decode success:: ${JSON.stringify(decoded)}`);
                resolve(decoded);
            }
        });
    });
};

export const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await createToken(payload, publicKey, '2 days');
        const refreshToken = await createToken(payload, privateKey, '7 days');

        await verifyToken(accessToken, publicKey);

        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error create token pair:', error);
        throw error;
    }
};

const extractToken = (bearerToken) => {
    if (!bearerToken) return null;
    const parts = bearerToken.split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
        return parts[1];
    }
    return bearerToken;
};

export const authentication = asyncHandler(async (req, res, next) => {
    /*
        1. check userId missing ?
        2. get accessToken
        3. verify Token
        4. check user in db
        5. check keyStore with this user
        5. OK -> return next()
    */
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new UnauthorizedError('Invalid Request');

    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) throw new NotFoundError('Not found keystore');

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new UnauthorizedError('Invalid Request');

    const token = extractToken(accessToken);
    if (!token) throw new UnauthorizedError('Invalid Token Format');

    try {
        const decodeUser = await verifyToken(token, keyStore.publicKey);
        if (userId !== decodeUser.userId) throw new UnauthorizedError("Invalid User");

        req.keyStore = keyStore;

        return next();
    } catch (error) {
        throw error;
    }
});
