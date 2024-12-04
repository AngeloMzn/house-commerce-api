import { productDao } from "../../dao/ProductDao";

interface Product {
    description:      string;
    price:     number;
    type:      string;
    userId: number;
}
class CrudProductAction{


    public async createProduct(product: Product){
        const response = await productDao.createProduct(product);
        if (response) {
            return {message: "Produto cadastrado com sucesso!"};
        }
        return {message: "Erro: Não foi possível cadastrar o Produto!"};
    }
    public async readProduct(id: number){
        const response = await productDao.getProductById(id);
        if (response) {
            return {message: "Produto buscado com sucesso!", product: response};
        }
        return {message: "Erro: Não foi possível encontrar o Produto!"};
    }
    public async updateProduct(id:number, product: Product){
        const productOld = await productDao.getProductById(id);
        let response = null;
        if(productOld && productOld.userId == product.userId){
            response = await productDao.updateProduct(id, product);
        }else{
            return {message: "Erro: Você não tem permissão para isso !"};
        }
        if (response) {
            return {message: "Produto atualizado com sucesso!"};
        }
        return {message: "Erro: Não foi possível atualizar o Produto!"};
    }   
    public async deleteProduct(id:number, product: Product){
        const productOld = await productDao.getProductById(id);
        let response = null;
        if(productOld && productOld.userId == product.userId){
            response = await productDao.deleteProduct(id);
        }
        if (response) {
            return {message: "Produto deletado com sucesso!"};
        }
        return {message: "Erro: Não foi possível deletar o Produto!"};
    }

}
export const crudProductAction = new CrudProductAction();