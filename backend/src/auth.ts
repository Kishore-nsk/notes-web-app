import {Request, Response, NextFunction} from 'express';
require('dotenv').config();
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json("No token provided");
    }

    const tokenWithoutBearer = token.split(' ')[1];
    console.log(tokenWithoutBearer);

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET! , (err, decoded) => {
        console.log(decoded);
        if (err) {
            return res.status(401).json({message: 'Invalid or expired token'});
        }

        req.user = decoded;
        next();
    });
};

export default authMiddleware;
