'use strict'

import mongoose from "mongoose";

const connectString = `mongodb://localhost:27017/db_petshop`;
const isDev = true;
mongoose.connect(connectString)
    .then(() => {
        console.log(`Connected MongoDB Success`);
    })
    .catch((error) => {
        console.log(`Error Connect: ${JSON.stringify(error, null, 2)}`);
    });

// dev
if (isDev) {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });
};

export default mongoose;

