// request-limit.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLimitMiddleware implements NestMiddleware {
  private requestCount: number = 0;
  private maxRequests: number = 100; // Set your desired maximum number of requests

  use(req: Request, res: Response, next: NextFunction) {
    this.requestCount++;

    if (this.requestCount > this.maxRequests) {
      return res.status(429).json({ message: 'Too many requests' });
    }

    next();
  }
}
