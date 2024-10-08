'use strict'
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { USER_ROLES } from '../constants/index.js';
import crypto from 'node:crypto';
import KeyTokenService from './keyToken.service.js';
import { createTokenPair } from '../auth/authUtils.js';
import { getInfoData } from '../utils/index.js';

class AccessService {
    static async signUp({ name, email, password, roles = [USER_ROLES.USER], status = 'active' }) {
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

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const keyStore = await KeyTokenService.createKeyToken({
            userId: newUser._id,
            publicKey,
            privateKey,
        });

        if (!keyStore) {
            return {
                code: '400',
                message: 'keyStore error!!!',
            };
        }

        const tokens = await createTokenPair({ userId: newUser._id, email }, keyStore.publicKey, keyStore.privateKey);
        console.log('Create token pair success!!!:: ', tokens);

        return {
            code: '201',
            metadata: {
                user: getInfoData({ fields: ['_id', 'name', 'email'], object: newUser }),
                tokens,
            }
        };
    }
}

export default AccessService;