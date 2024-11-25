import { Request, Response } from "express";
import { listProductAction } from "../usecases/Product/ListProductAction";
import { crudProductAction } from "../usecases/Product/CrudProductAction";
class ProductController {
  public async createProduct(req: Request, res: Response): Promise<Response> {
    try{
        const response = crudProductAction.createProduct(req.body);
        if(await response){
          return res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
        }
        return res.status(400).json({ message: 'Falha ao cadastrar o produto.' });
    }catch (error){
      console.error(error as any);
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }

  public async getProductes(req: Request, res: Response): Promise<Response> {
    try {
        const response = await listProductAction.getProductes();
        return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }

  public async getProductById(req: Request, res: Response): Promise<Response> {
    try {
        const response = await crudProductAction.readProduct(Number(req.params.id));
        return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
        const response = await crudProductAction.updateProduct(Number(req.params.id), req.body);
        return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
        const response = await crudProductAction.deleteProduct(Number(req.params.id));
        return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }  
}

export const productController = new ProductController();
