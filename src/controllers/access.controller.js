'use strict'

import { CREATED, OK } from '../core/sucess.response.js';
import AccessService from '../services/access.service.js';

class AccessController {

    signUp = async (req, res, next) => {
        const result = await AccessService.signUp(req.body);
        new CREATED({
            message: "Regiserted OK!",
            metadata: result,
        }).send(res);
    }

    login = async (req, res, next) => {
        new OK({
            message: "Login Successfully!",
            metadata: await AccessService.login(req.body)
        }).send(res);
    }
}

export default new AccessController();