'use strict'

import HEADER from "../constants/header.const.js";
import { findByApiKey } from "../services/apikey.service.js";

export const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({ message: 'Forbidden Error' });
        }

        // check apiKey
        const objKey = await findByApiKey(key);
        if (!objKey) {
            return res.status(403).json({ message: 'Forbidden Error' });
        }

        req.objKey = objKey;
        next();
    } catch (error) {
        return res.status(403).json({ message: error.message });
    };
};

export const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        const validPermission = req.objKey.permissions.includes(permission);
        if (!validPermission) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        return next();
    }
}
