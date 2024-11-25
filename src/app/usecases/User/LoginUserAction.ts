import { userDao } from "../../dao/UserDao";
import bcrypt from "bcrypt";

interface Data {
    email: string;
    password: string;
    role: string;   
}

class LoginUserAction{

    public async login(data: Data) {
        const user = await userDao.getUserByEmail(data.email);
       if(user && bcrypt.compareSync(data.password, user.password)){
            return {message: 'Usuário logado com sucesso!', user: user};
        }
        return {message: 'Credenciais inválidas.'};
    }
}

export const loginUserAction = new LoginUserAction();