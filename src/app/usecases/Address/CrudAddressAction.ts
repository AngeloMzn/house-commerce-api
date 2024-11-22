import { addressDao } from "../../dao/AddressDao";

interface Address {
    uf: string;
    cep: string;
    city: string;
    street: string;
    number: string;
    type: string;
    complement: string;
    userId: Promise<number>;
}
class CrudAddressAction{
    public async createAddress(address: Address){
        const response = await addressDao.createAddress(address);
        if (response) {
            return {message: "Endereço cadastrado com sucesso!"};
        }
        return {message: "Erro: Não foi possível cadastrar o endereço!"};
    }
    public async updateAddress(id:number, address: Address){
        const response = await addressDao.updateAddress(id, address);
        if (response) {
            return {message: "Endereço atualizado com sucesso!"};
        }
        return {message: "Erro: Não foi possível atualizar o endereço!"};
    }   
    public async deleteAddress(id:number){
        const response = await addressDao.deleteAddress(id);
        if (response) {
            return {message: "Endereço deletado com sucesso!"};
        }
        return {message: "Erro: Não foi possível deletar o endereço!"};
    }

}
export const crudAddressAction = new CrudAddressAction();