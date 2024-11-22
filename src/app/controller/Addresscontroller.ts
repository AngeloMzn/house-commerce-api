import { Request, Response } from "express";
import { listAddressAction } from "../usecases/Address/ListAddressAction";
import { crudAddressAction } from "../usecases/Address/CrudAddressAction";
class AddressController {
  public async createAddress(req: Request, res: Response): Promise<Response> {
    try{
        const response = crudAddressAction.createAddress(req.body);
        return res.status(201).json(response);
    }catch (error){
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }

  public async getAdressesByUserId(req: Request, res: Response): Promise<Response> {
    try {
        const response = await listAddressAction.getAddressesByUserId(Number(req.params.id));
        return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }

  public async updateAddress(req: Request, res: Response): Promise<Response> {
    try {
        const response = await crudAddressAction.updateAddress(Number(req.params.id), req.body);
        return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }

  public async deleteAddress(req: Request, res: Response): Promise<Response> {
    try {
        const response = await crudAddressAction.deleteAddress(Number(req.params.id));
        return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }  
}

export const addressController = new AddressController();
