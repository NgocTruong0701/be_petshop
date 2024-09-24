'use strict'
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { USER_ROLES } from '../constants/index.js';
import crypto from 'crypto';

class AccessService {

    static signUp = async ({ name, email, password, roles = [USER_ROLES.USER], status = 'active' }) => {
        try {
            const user = await User.findOne({ email }).lean();
            if (user) {
                return {
                    code: '400',
                    message: 'User is already registerd!!!',
                };
            };

            let passwordHash = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name, email, passwordHash, roles, status
            });

            if (newUser) {
                // created privateKey, publicKey
                const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                });

                console.log({ privateKey, publicKey }); // save collection KeyStore
                
                
            }
        } catch (error) {
            return {
                code: '500',
                message: error.message,
                status: 'error',
            };
        };
    };
};

export default AccessService;