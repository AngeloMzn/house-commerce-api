import express from 'express';
import path from 'path';
import { router } from './routes';
import cors from 'cors';

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(express.json());
    this.server.use('/images', express.static(path.join(__dirname, '../public/images')));
   
     this.server.use(cors({
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'], 
    }));
  }

  private router() {
    this.server.use(router);
  }
}

require('dotenv').config();

