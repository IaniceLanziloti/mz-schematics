import aws, { SecretsManager } from 'aws-sdk';
import { injectable } from 'inversify';
import { AppError } from 'shared/errors/AppError';

import { IGetConnectionDTO } from '../dtos';
import { IDatabaseStringProvider } from '../interfaces';

const { region, secretName } = process.settings.aws.secretManager;

@injectable()
class AWSSecretManagerDatabaseStringProvider
  implements IDatabaseStringProvider
{
  private client: SecretsManager;

  constructor() {
    this.client = new aws.SecretsManager({
      region,
    });
  }

  async getConnectionString(params: IGetConnectionDTO): Promise<string> {
    const { companyId } = params;

    // eslint-disable-next-line no-console
    console.log(companyId);
    try {
      const data = await this.client
        .getSecretValue({
          SecretId: secretName,
        })
        .promise();

      if (!data.SecretString) {
        throw new AppError('Secret not found', 404);
      }

      const objectString = JSON.parse(data.SecretString);

      const { host, port, username, password, dbname: database } = objectString;

      return `postgresql://${username}:${password}@${host}:${port}/${database}`;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw new AppError(`${error.code}:${error.message}`, error.statusCode);
    }
  }
}

export { AWSSecretManagerDatabaseStringProvider };
