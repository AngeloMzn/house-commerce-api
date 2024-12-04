import { Request, Response } from "express";
import { signUpUserAction } from "../usecases/User/SignupUserAction";
import { loginUserAction } from "../usecases/User/LoginUserAction";


class UserController {

  public async signup(req: Request, res: Response): Promise<Response> {
    try {
      const response = await signUpUserAction.signUp(req.body);
      console.error(response);
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const response = await loginUserAction.login(req.body, req);
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error as any });
    }
  }

}

export const userController = new UserController();
