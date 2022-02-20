import { COOKIE_NAME } from "../constants/cookie-name.js";
import { Router } from 'express';
import * as jwt from '../config/jwt.js';
import { auth, authenticate, condAction } from "./middlewares.js";

const tries = [
    {
        'с': 0,
        'к': 0,
        'о': 2,
        'б': 2,
        'а': 2
    },
    {
        'с': 0,
        'к': 0,
        'о': 2,
        'б': 2,
        'а': 2
    }
];
const words = ["проба", "радио", "плоча", "круша", "кашон"];
const word = [];
let currentWord = words[0];

export default (app, apiPath) => {
    const router = new Router();
    router.get('/auth', condAction('authenticate'), authenticate);

    router.post('/auth', condAction('register'), (req, res, next) => {
        console.log(req.body);
        res.status(201).end();
    });

    router.post('/auth', condAction('login'), (req, res, next) => {
        console.log(req.body);
        jwt.createToken(req.body)
            .then(token => {
                res.cookie(COOKIE_NAME, token).send(req.body);
            }).catch(next)
    });

    router.get('/auth', condAction('logout'), (req, res, next) => {
        res.clearCookie(COOKIE_NAME).status(200).send({message: 'success'});
    });

    router.get('/word', auth, (req, res, next) => {
        res.status(200).send({wordLength: 5, tries});
    });

    router.post('/word', auth, (req, res, next) => {
        tries.push(req.body);
        res.status(200).send({tries, wordLength: currentWord.length})
    });


    // app.get('/rules', ( req, res, next ) => {
    //     console.log(req.cookies);
    //     res.render('index',{title: 'test title', test: 123, token: 123123123});
    // });
    // app.get('/profile', ( req, res, next ) => {
    //     console.log(req.cookies);
    //     res.render('index',{title: 'test title', test: 123, token: 123123123});
    // });
    // app.get('/rank', ( req, res, next ) => {
    //     console.log(req.cookies);
    //     res.render('index',{title: 'test title', test: 123, token: 123123123});
    // });
    app.use(apiPath, router)
};
