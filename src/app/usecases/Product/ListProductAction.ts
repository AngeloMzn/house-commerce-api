import { response } from "express";
import { userDao } from "../../dao/UserDao";
import { productDao } from "../../dao/ProductDao";

class ListProductAction{

    public async getProducts(data: any){
        const response = await productDao.getProductByUserId(data.userId);
        if(response){
            return response;
        }
        return {message: 'Nenhum produto encontrado...'};
    }

}

export const listProductAction = new ListProductAction();