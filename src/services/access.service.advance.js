'use strict'
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { USER_ROLES } from '../constants/index.js';
import crypto from 'crypto';
import KeyTokenService from './keyToken.service.js';
import { createTokenPair } from '../auth/authUtils.js';
import { getInfoData } from '../utils/index.js';

class AccessServiceAdvance {
    static async signUp({ name, email, password, roles = [USER_ROLES.USER], status = 'active' }) {
        try {
            const existingUser = await User.findOne({ email }).lean();
            if (existingUser) {
                return {
                    code: '400',
                    message: 'User is already registered!!!',
                };
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await User.create({ name, email, password: passwordHash, roles, status });

            if (!newUser) {
                return {
                    code: '200',
                    metadata: null,
                };
            }

            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem',
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem',
                }
            });

            const publicKeyString = await KeyTokenService.createKeyToken({
                userId: newUser._id,
                publicKey,
            });

            if (!publicKeyString) {
                return {
                    code: '400',
                    message: 'Invalid public key!!!',
                };
            }

            const publicKeyObject = crypto.createPublicKey(publicKeyString);
            const tokens = await createTokenPair({ userId: newUser._id, email }, publicKeyObject, privateKey);
            console.log('Create token pair success!!!:: ', tokens);

            return {
                code: '201',
                metadata: {
                    user: getInfoData({ fields: ['_id', 'name', 'email'], object: newUser }),
                    tokens,
                }
            };
        } catch (error) {
            return {
                code: '500',
                message: error.message,
                status: 'error',
            };
        }
    }
}

export default AccessServiceAdvance;