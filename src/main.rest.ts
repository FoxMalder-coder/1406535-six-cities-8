import 'reflect-metadata';
import { Container } from 'inversify';
import { PinoLogger } from '#libs/logger/pino.logger.js';
import { RESTApp } from './rest/rest.app.js';
import { Config, RestConfig, RestSchema } from '#libs/config/index.js';
import { Component } from '#shared/const.js';

async function bootstrap() {
  const container = new Container();

  container.bind<RESTApp>(Component.RestApp).to(RESTApp).inSingletonScope();
  container.bind<PinoLogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const app = container.get<RESTApp>(Component.RestApp);
  await app.init();
}

bootstrap();
