import { Request, Response, NextFunction } from "express" 

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "Token não fornecido ou inválido."});
    }

    const token = authHeader.split(" ")[1];
    req.token = token;

    next();
}
