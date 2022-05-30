import { AWSSecretManagerDatabaseStringProvider } from './implementations/AWSSecretManagerDatabaseStringProvider';
import { EnvironmentDatabaseStringProvider } from './implementations/EnvironmentDatabaseStringProvider';

const providers = {
  aws: AWSSecretManagerDatabaseStringProvider,
  env: EnvironmentDatabaseStringProvider,
};

const DatabaseStringProvider = providers[process.settings.providers.secret];

export { DatabaseStringProvider };
