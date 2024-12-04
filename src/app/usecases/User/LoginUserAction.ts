import { userDao } from "../../dao/UserDao";
import bcrypt from "bcrypt";
import session, { Session } from "express-session";
import { Request } from "express";


declare module "express-session" {
    interface SessionData {
        userId: string;
    }
}

interface Data {
    email: string;
    password: string;
    role: string;   
}

class LoginUserAction {
    public async login(data: Data, req: Request & { session: Session & Partial<session.SessionData> }) {
        try {
            const user = await userDao.getUserByEmail(data.email);
            if (user && bcrypt.compareSync(data.password, user.password)) {
                console.error('Usuário logado com sucesso! ID:', user.id);
                if (!req.session) {
                    req.session = { cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }, regenerate: () => {}, destroy: () => {}, reload: () => {}, save: () => {}, touch: () => {} } as unknown as session.Session & Partial<session.SessionData>;
                }
                req.session.userId = user.id.toString();
                return { message: 'Usuário logado com sucesso!', user: user };
            }
            return { message: 'Credenciais inválidas.' };
        } catch (error) {
            console.error('Erro ao tentar logar usuário:', error);
            return { message: 'Erro ao tentar logar usuário.' };
        }
    }
}

export const loginUserAction = new LoginUserAction();