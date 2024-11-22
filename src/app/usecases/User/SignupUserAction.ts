import { addressDao } from "../../dao/AddressDao";
import { userDao } from "../../dao/UserDao";
import bcrypt from "bcrypt";

interface Data {
    email: string;
    name: string;
    cpf: string;
    rg: string;
    role: string;
    phone: string;
    birthdate: Date;
    password: string;
    address: {
        uf: string;
        cep: string;
        city: string;
        street: string;
        number: string;
        type: string;
        complement: string;
    }
}

class SignUpUserAction {

    public async signUp(data: Data) {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const user = {
            email: data.email,
            name: data.name,
            cpf: data.cpf,
            rg: data.rg,
            role: data.role,
            phone: data.phone,
            birthdate: data.birthdate,
            password: hashedPassword,
            image: ""
        };
        const userId = await userDao.createUser(user);
        const address = {
            uf: data.address.uf,
            cep: data.address.cep,
            city: data.address.city,
            street: data.address.street,
            number: data.address.number,
            type: data.address.type,
            complement: data.address.complement,
            userId: Promise.resolve(userId.id)
        };

        const addressId = await addressDao.createAddress(address);
        
        if (userId && addressId) {
            return { message: 'Usuário cadastrado com sucesso!' };
        } else if (!addressId) {
            return { message: 'Erro ao cadastrar endereço!' };
        }
        return { message: 'Erro ao cadastrar usuário!' };
    }

}

export const signUpUserAction = new SignUpUserAction();
