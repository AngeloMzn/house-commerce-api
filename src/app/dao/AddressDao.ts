import db from "../../core/db";

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

class AddressDao {
    
    async getAddresses() {
        return db.address.findMany();
    }

    async getAddressesByUserId(userId: number) {
        return db.address.findMany({
            where: {
                userId: userId
            }
        });
    }

    async getAddressById(id: number) {
        return db.address.findUnique({
            where: {
                id: id
            }
        });
    }

    async createAddress(address: Address) {
        const userId = await address.userId;
        return db.address.create({
            data: {
                uf: address.uf,
                cep: address.cep,
                city: address.city,
                street: address.street,
                number: address.number,
                type: address.type,
                complement: address.complement,
                userId: userId
            }
        });
    }

    async updateAddress(id: number, address: Address) {
        const userId = await address.userId;
        return db.address.update({
            where: {
                id: id
            },
            data: {
                uf: address.uf,
                cep: address.cep,
                city: address.city,
                street: address.street,
                number: address.number,
                type: address.type,
                complement: address.complement,
                userId: userId
            }
        });
    }

    async deleteAddress(id: number) {
        return db.address.delete({
            where: {
                id: id
            }
        });
    }
}
export const addressDao = new AddressDao();