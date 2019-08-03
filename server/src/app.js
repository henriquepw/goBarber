import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';

import { resolve } from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';

import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';
import redisConfig from './config/redis';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(helmet());
    this.server.use(cors({ origin: process.env.FRONT_URL }));
    this.server.use(express.json());

    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient(redisConfig),
          }),
          windowMs: 1000 * 60 * 15,
          max: 100,
        })
      );
    }
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors =
        process.env.NODE_ENV === 'development'
          ? await new Youch(err, req).toJSON()
          : { error: 'Internal server error' };

      return res.status(err.status || 500).json(errors);
    });
  }
}

export default new App().server;
