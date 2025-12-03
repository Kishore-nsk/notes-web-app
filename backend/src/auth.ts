import {Request, Response, NextFunction} from 'express';
require('dotenv').config();
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json("No token provided");
    }

    try {
         const user = jwt.verify(token, process.env.JWT_SECRET!);
         req.user = user;
         next();
    } catch (err) {
        return res.status(401).json({message: 'Invalid or expired token'});
    }
};

export default authMiddleware;
