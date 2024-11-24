import db from "../../core/db";

interface Product {
    description:      string;
    price:     number;
    type:      string;
    
}

class ProductDao {
    
    async getProductes() {
        return db.product.findMany();
    }

    async getProductById(id: number) {
        return db.product.findUnique({
            where: {
                id: id
            }
        });
    }

    async createProduct(product: Product) {
        return db.product.create({
            data: {
                description: product.description,
                price:  product.price,
                type:   product.type
            }
        });
    }

    async updateProduct(id: number, product: Product) {
        return db.product.update({
            where: {
                id: id
            },
            data: {
                description: product.description,
                price:  product.price,
                type:   product.type
            }
        });
    }

    async deleteProduct(id: number) {
        return db.product.delete({
            where: {
                id: id
            }
        });
    }
}
export const productDao = new ProductDao();