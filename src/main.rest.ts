#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { Component } from './shared/const.js';
import { RESTApplication } from './rest/rest.application.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';
import { createAuthContainer } from './shared/modules/auth/index.js';

async function bootstrap() {
  const container = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createAuthContainer(),
  );

  const application = container.get<RESTApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
