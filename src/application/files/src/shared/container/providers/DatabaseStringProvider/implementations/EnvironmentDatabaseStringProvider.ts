import { injectable } from 'inversify';

import { IGetConnectionDTO } from '../dtos';
import { IDatabaseStringProvider } from '../interfaces';

@injectable()
class EnvironmentDatabaseStringProvider
  implements IDatabaseStringProvider
{
  async getConnectionString(_: IGetConnectionDTO): Promise<string> {
    const { host, port, database, username, password } = process.settings.db;

    return `postgresql://${username}:${password}@${host}:${port}/${database}`;
  }
}

export { EnvironmentDatabaseStringProvider };
