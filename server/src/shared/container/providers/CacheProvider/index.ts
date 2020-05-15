import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';
import RedisCachecProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCachecProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
