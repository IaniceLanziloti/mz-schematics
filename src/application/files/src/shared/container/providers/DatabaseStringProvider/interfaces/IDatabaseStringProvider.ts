import { IGetConnectionDTO } from '../dtos';

interface IDatabaseStringProvider {
  getConnectionString(params: IGetConnectionDTO): Promise<string>;
}

export { IDatabaseStringProvider };
