import { Request, Response, NextFunction } from 'express';

export interface Route {
  path: string;
  method: 'get' | 'post' | 'delete' | 'patch' | 'put';
  handler: (req: Request, res: Response, next: NextFunction) => void;
}
