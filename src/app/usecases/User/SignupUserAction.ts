import { productDao } from "../../dao/ProductDao";
import { userDao } from "../../dao/UserDao";
import bcrypt from "bcrypt";

interface Data {
    email: string;
    password: string;
}

class SignUpUserAction {

    public async signUp(data: Data) {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const user = {
            email: data.email,
            password: hashedPassword,
        };
        const userId = await userDao.createUser(user);

        
        if (userId) {
            return { message: 'Usuário cadastrado com sucesso!' };
        } 
        return { message: 'Erro ao cadastrar usuário!' };
    }

}

export const signUpUserAction = new SignUpUserAction();
