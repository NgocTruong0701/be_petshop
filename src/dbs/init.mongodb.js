'use strict'

import mongoose from "mongoose";
import { countConnect } from "../helpers/check.connection.js";
import config from "../configs/config.mongodb.js";

const connectString = process.env.MONGODB_URI || `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
const isDev = process.env.ENV === 'dev';

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        Database.instance = this;
        this.connect();
    }

    // connect 
    connect(type = 'mongodb') {
        mongoose.connect(connectString)
            .then(() => {
                console.log(`Connected MongoDB Success`);
                countConnect();
            })
            .catch((error) => {
                console.error(`Error Connect: `, error);
            });

        // dev
        if (isDev) {
            mongoose.set('debug', { color: true });
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();

export default instanceMongoDb;