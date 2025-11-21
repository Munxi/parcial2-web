import { Injectable, NestMiddleware } from '@nestjs/common';
@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  use(req: any, res: any, next: Function) {
    const start = Date.now();
    res.on('finish', () => {
      const outMsg = {
        url: req.originalUrl,
        status: res.statusCode,
        duration_ms: Date.now() - start,
        method: req.method,
      };
      console.log('[OUT]', JSON.stringify(outMsg));
    });
    next();
  }
}
