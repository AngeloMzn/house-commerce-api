import db from "../../core/db";
import fs from 'fs';
import path from 'path';

interface User {
    email: string;
    password: string;
}
class UserDao {

    async getUsers() {
        return db.user.findMany();
    }

    async getUserById(id: number) {
        return db.user.findUnique({
            where: {
                id: id
            }
        });
    }

    async getUserByEmail(email: string) {
        return db.user.findUnique({
            where: {
                email: email
            }
        });
    }

    async createUser(user: User) {
        return db.user.create({
            data: {
                email: user.email,
                password: user.password,
            }
        });
    }

    async updateUser(id: number, user: User) {
        return db.user.update({
            where: {
                id: id
            },
            data: user
        });
    }

    async deleteUser(id: number) {
        return db.user.delete({
            where: {
                id: id
            }
        });
    }

}
export const userDao = new UserDao();