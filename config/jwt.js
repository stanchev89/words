import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../constants/jwt-secret.js";

// All options -> https://github.com/auth0/node-jsonwebtoken
const baseOptions = {};

export function createToken(payload, expiryTime) {
  const options = !!expiryTime ? { ...baseOptions, expiresIn: expiryTime } : { ...baseOptions };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, options, (err, token) => {
      if (err) {
        return void reject(err);
      }
      resolve(token);
    });
  });
}

export function decode(token) {
  return Promise.resolve(jwt.decode(token));
}

export function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, baseOptions, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}
