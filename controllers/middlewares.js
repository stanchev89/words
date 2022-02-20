import { COOKIE_NAME } from "../constants/cookie-name.js";
import * as jwt from '../config/jwt.js'


export const auth = (req, res, next) => {
  const token = req.cookies[COOKIE_NAME];
  if(!token) {
    return next('Unauthorized!')
  }
  jwt.verify(token).catch(err => Promise.reject(err))
    .then(user => {
      req.user = user;
      return next()
    })
};

export const authenticate = (req, res, next) => {
  const token = req.cookies[COOKIE_NAME];
  if(!token) {
    return next('Unauthorized');
  }
  jwt.verify(token)
    .then((data) => res.status(200).send({user: data}) )
    .catch(next)
};

export function condRoute(condFn) {
  return function (req, _res, next) {
    if (condFn(req)) { return next(); }
    next('route');
  };
};

export function condAction(actionName) {
  return condRoute(req => req.query.action === actionName);
}