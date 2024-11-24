import { response } from "express";
import { userDao } from "../../dao/UserDao";
import { productDao } from "../../dao/ProductDao";

class ListProductAction{

    public async getProductes() {
        const response = await productDao.getProductes();
        if(response){
            return response;
        }
        return {message: 'Nenhum produto encontrado...'};
    }

}

export const listProductAction = new ListProductAction();