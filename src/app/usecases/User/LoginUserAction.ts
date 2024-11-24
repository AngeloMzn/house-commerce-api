import { userDao } from "../../dao/UserDao";
import bcrypt from "bcrypt";

interface Data {
    email: string;
    password: string;
}

class LoginUserAction {

    public async login(data: Data) {
        const user = await userDao.getUserByEmail(data.email);
        return user ;
    }
}

export const loginUserAction = new LoginUserAction();