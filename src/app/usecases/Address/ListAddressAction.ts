import { response } from "express";
import { userDao } from "../../dao/UserDao";
import { addressDao } from "../../dao/AddressDao";

class ListAddressAction{

    public async getAddressesByUserId(userId: number) {
        const response = await addressDao.getAddressesByUserId(userId);
        if(response){
            return response;
        }
        return {message: 'Nenhum endereço encontrado...'};
    }

}

export const listAddressAction = new ListAddressAction();