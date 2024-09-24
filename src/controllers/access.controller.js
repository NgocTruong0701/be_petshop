'use strict'

class AccessController {

    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body);

            return res.status(201).json({
                code: 201,
                data: {
                    userId: 1,
                }
            })
        } catch (error) {
            next(error)
        };
    };
};

export default new AccessController();