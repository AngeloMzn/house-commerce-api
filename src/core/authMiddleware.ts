import { Request, Response, NextFunction } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const KEYCLOAK_URL = "https://tdsoft-auth.hsborges.dev/realms/trabalho-pratico/.well-known/openid-configuration";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não fornecido ou inválido." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const { data } = await axios.get(KEYCLOAK_URL);
        const jwksUri = data.jwks_uri;


        const { data: keyData } = await axios.get(jwksUri);

        const decodedHeader = jwt.decode(token, { complete: true });
        if (!decodedHeader || !decodedHeader.header) {
            throw new Error("Token inválido ou não foi possível decodificar o cabeçalho.");
        }

        const { kid } = decodedHeader.header;
        const signingKey = keyData.keys.find((key: any) => key.kid === kid);

        if (!signingKey) {
            throw new Error("Chave correspondente não encontrada.");
        }

        const cert = signingKey.x5c[0];
        const publicKey = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`;

        const verifiedToken = jwt.verify(token, publicKey, {
            algorithms: ["RS256"],
            audience: "account",
            issuer: "https://tdsoft-auth.hsborges.dev/realms/trabalho-pratico",
        });

        (req as any).user = verifiedToken;
        next();
    } catch (error: any) {
        return res.status(401).json({ message: `Erro ao validar o token: ${error.message}` });
    }
};
