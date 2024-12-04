import db from "../../core/db";

interface Product {
    description: string;
    price: number;
    type: string;
    userId: number;
}

class ProductDao {

    async getProductes() {
        try {
            return await db.product.findMany();
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }

    async getProductById(id: number) {
        try {
            return await db.product.findUnique({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            throw error;
        }
    }
    async getProductByUserId(id: number) {
        try {
            return await db.product.findMany({
                where: {
                    userId: id
                }
            });
        } catch (error) {
            console.error(`Error fetching products for user with id ${id}:`, error);
            throw error;
        }
    }

    async createProduct(product: Product) {
        try {
            return await db.product.create({
                data: {
                    description: product.description,
                    price: product.price,
                    type: product.type,
                    userId: product.userId
                }
            });
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    }

    async updateProduct(id: number, product: Product) {
        try {
            return await db.product.update({
                where: {
                    id: id
                },
                data: {
                    description: product.description,
                    price: parseFloat(product.price.toString()),
                    type: product.type
                }
            });
        } catch (error) {
            console.error(`Error updating product with id ${id}:`, error);
            throw error;
        }
    }

    async deleteProduct(id: number) {
        try {
            return await db.product.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.error(`Error deleting product with id ${id}:`, error);
            throw error;
        }
    }
}

export const productDao = new ProductDao();