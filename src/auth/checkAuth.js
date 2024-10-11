'use strict'

import HEADER from "../constants/header.const.js";
import { ForbiddenError } from "../core/error.response.js";
import { findByApiKey } from "../services/apikey.service.js";

export const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            console.log('API key không được cung cấp');
            throw new ForbiddenError('API key không được cung cấp');
        }

        // check apiKey
        const objKey = await findByApiKey(key);
        if (!objKey) {
            console.log('API key không hợp lệ');
            throw new ForbiddenError('API key không hợp lệ');
        }

        req.objKey = objKey;
        next();
    } catch (error) {
        console.error('Lỗi trong quá trình xác thực API key:', error);
        throw new ForbiddenError(error.message);
    }
};

export const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            throw new ForbiddenError('Permission denied');
        }

        const validPermission = req.objKey.permissions.includes(permission);
        if (!validPermission) {
            throw new ForbiddenError('Permission denied');
        }

        return next();
    }
}
