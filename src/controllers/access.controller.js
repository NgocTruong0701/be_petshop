'use strict'

import AccessService from '../services/access.service.js';

class AccessController {

    signUp = async (req, res, next) => {
        const result = await AccessService.signUp(req.body);
        return res.status(201).json(result);
    }
}

export default new AccessController();