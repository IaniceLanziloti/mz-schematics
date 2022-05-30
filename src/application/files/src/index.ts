import 'reflect-metadata';
import 'dotenv/config';
import './settings';

import { ServerFactory } from './shared/http/server';

const server = ServerFactory.create();

server.registerRoutes(server);

server.listen(process.settings.app.port);
