import { productDao } from "../../dao/ProductDao";

interface Product {
    description:      string;
    price:     number;
    type:      string;
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
        const response = await productDao.updateProduct(id, product);
        if (response) {
            return {message: "Produto atualizado com sucesso!"};
        }
        return {message: "Erro: Não foi possível atualizar o Produto!"};
    }   
    public async deleteProduct(id:number){
        const response = await productDao.deleteProduct(id);
        if (response) {
            return {message: "Produto deletado com sucesso!"};
        }
        return {message: "Erro: Não foi possível deletar o Produto!"};
    }

}
export const crudProductAction = new CrudProductAction();