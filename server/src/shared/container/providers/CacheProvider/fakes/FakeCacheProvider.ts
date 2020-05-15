import ICacheProvider from '../models/ICacheProvider';

interface IClient {
  [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
  private client: IClient;

  public async save<T>(key: string, value: T): Promise<void> {
    this.client[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.client[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.client[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.client).filter(key =>
      key.match(new RegExp(`${prefix}:*`, 'g')),
    );

    keys.forEach(key => {
      delete this.client[key];
    });
  }
}

export default FakeCacheProvider;
