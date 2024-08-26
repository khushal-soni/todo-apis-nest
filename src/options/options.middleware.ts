import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class OptionsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.status(200).json({ status: 200, message: 'OK' });
    } else {
      next();
    }
  }
}
