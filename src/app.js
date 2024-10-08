import express from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import compression from 'compression';
import instanceMongoDb from './dbs/init.mongodb.js';
import { checkOverLoad } from './helpers/check.connection.js';
import router from '../src/routers/index.js';
import 'dotenv/config';
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers.js';

const app = express();

// init middlewares
app.use(morgan('dev')); // log thông tin request 
// app.use(morgan('combined'));
app.use(helmet()); // ẩn 1 số thông tin máy chủ khi response 
app.use(compression()); // downsize data response
app.use(express.json()); // parse data json
app.use(express.urlencoded({ extended: true })); // parse data urlencoded

// init db
instanceMongoDb;
// checkOverLoad();

// init routers
app.use('', router);


// handling error
app.use(notFoundHandler); // middleware will be called when route not found

app.use(errorHandler); // middleware will be called when error, must have 4 params (error, req, res, next) to distinguish from regular middleware


export default app;