import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from '../config/index.js';
import path from 'path';
const envMap = {
    dev: 'development',
    prod: 'production'
};
export default (app) => {
    const env = envMap[process.env.NODE_ENV] || 'development';

    app.set('view engine', 'ejs');
    app.set('views', __pathDir + "/views");

    app.disable('x-powered-by');

    app.use(express.urlencoded({extended: true}));
    app.use(cors({origin: '*'}));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.static(config[env].staticPath));

    app.get('*', (req, res, next) => {
        if (req.url.indexOf('/api/') > -1 ||
            req.url.indexOf('favicon.ico') > -1 ||
            req.url.match(/\w+\/assets\//) ||
            req.url.indexOf('/i/') > -1) {
            next();
            return;
        }

        res.sendFile(path.resolve(config[env].staticPath, 'index.html'));
    });
};
