'use strict'
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { USER_ROLES } from '../constants/index.js';
import crypto, { generateKey } from 'node:crypto';
import KeyTokenService from './keyToken.service.js';
import { createTokenPair } from '../auth/authUtils.js';
import { getInfoData } from '../utils/index.js';
import { BadRequestError, InternalServerError, UnauthorizedError } from '../core/error.response.js';
import UserService from './user.service.js';

class AccessService {
    static async generateKey({ userId, email }) {
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const tokens = await createTokenPair({ userId: userId, email }, publicKey, privateKey);
        console.log('Create token pair success!!!:: ', tokens);

        const keyStore = await KeyTokenService.createKeyToken({
            userId: userId,
            publicKey: publicKey,
            privateKey: privateKey,
            refreshToken: tokens.refreshToken,
        });

        if (!keyStore) {
            throw new InternalServerError('Create key store failed!!!');
        }

        return tokens;
    }

    static async signUp({ name, email, password, roles = [USER_ROLES.USER], status = 'active' }) {
        const existingUser = await User.findOne({ email }).lean();
        if (existingUser) {
            throw new BadRequestError('User is already registered!!!');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: passwordHash, roles, status });

        if (!newUser) {
            throw new InternalServerError('Create user failed!!!');
        }

        const tokens = await AccessService.generateKey({ userId: newUser._id, email });

        return {
            code: '201',
            metadata: {
                user: getInfoData({ fields: ['_id', 'name', 'email'], object: newUser }),
                tokens,
            }
        };
    }

    static async login({ email, password, refreshToken = null }) {
        const user = await UserService.findByEmail({ email });
        if (!user) {
            throw new BadRequestError("User not registered");
        }

        const math = bcrypt.compare(password, user.password);
        if (!math) {
            throw new UnauthorizedError("Authentication error");
        }

        const tokens = await AccessService.generateKey({ userId: user._id, email })

        return {
            code: '200',
            metadata: {
                user: getInfoData({ fields: ['_id', 'name', 'email'], object: user }),
                tokens,
            }
        };
    }

    
}

export default AccessService;