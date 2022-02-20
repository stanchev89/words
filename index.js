import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import config from './config/index.js'
import expressConfig from './config/express.js';
import controllers from './controllers/index.js'

const env = process.env.NODE_ENV || "development";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__pathDir = __dirname;

const app = express();

expressConfig(app);
controllers(app,'/api');

// const dbConnectionPromise = require("./config/database")(config.dbConnectionString);
// dbConnectionPromise.then(() => {
//     app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
// });

app.listen(config[env].port, console.log(`Listening on port ${config[env].port}! Now its up to you...`));
