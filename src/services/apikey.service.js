'use strict'

import apiKeyModel from '../models/apikey.model.js';

export const findByApiKey = async (key) => {
    return await apiKeyModel.findOne({ key, status: true }).lean();
};

