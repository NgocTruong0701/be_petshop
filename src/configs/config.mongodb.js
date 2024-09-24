'use strict'
import 'dotenv/config';

// level 0
// export const config = {
//     app: {
//         port: 3000,
//     },
//     db: {
//         host: 'localhost',
//         port: 27017,
//         name: 'db_petshop',
//     }
// }

// level 1
const dev = {
    app: {
        port: process.env.APP_PORT || 3000,
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
    }
};

const pro = {
    app: {
        port: process.env.APP_PORT || 3000,
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
    }
};

const config = {
    dev,
    pro
};

const env = process.env.ENV || 'pro';

export default config[env];