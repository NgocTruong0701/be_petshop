'use strict'
import JWT from 'jsonwebtoken';

const createToken = (payload, key, expiresIn) => {
    return JWT.sign(payload, key, {
        expiresIn,
    });
};

const verifyToken = (token, publicKey) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, publicKey, (err, decoded) => {
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
