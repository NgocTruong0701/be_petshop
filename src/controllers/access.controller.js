'use strict'

import { CREATED } from '../core/sucess.response.js';
import AccessService from '../services/access.service.js';

class AccessController {

    signUp = async (req, res, next) => {
        const result = await AccessService.signUp(req.body);
        new CREATED({
            message: "Regiserted OK!",
            metadata: result,
        }).send(res);
    }
}

export default new AccessController();