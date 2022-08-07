<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Kong API Gateway to proxy request to NestJS Backend

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Install Kong in Docker

```
$ git clone https://github.com/Kong/docker-kong
$ cd compose/
$ KONG_DATABASE=postgres docker-compose --profile database up
```

## Kong Admin APIs

```bash
# Create service

curl -i -X POST \
  --url http://localhost:8001/services/ \
  --data 'name=example-service' \
  --data 'url=http://<machine''s ip>:3000'


curl -i -X GET --url http://localhost:8001/services/

curl -i -X GET --url http://localhost:8001/services/2a13f17f-836e-4a72-9569-4d7fa7bbc3d3

curl -i -X DELETE --url http://localhost:8001/services/5cd27390-db07-4928-be02-a4ad0cfa1786

curl -i -X PATCH \
  --url http://localhost:8001/services/2a13f17f-836e-4a72-9569-4d7fa7bbc3d3 \
  --data 'url=http://<machine''s ip>:3000'

# Create route
curl -i -X POST \
  --url http://localhost:8001/services/example-service/routes \
  --data 'hosts[]=example.com'

curl -i -X GET --url http://localhost:8001/routes

curl -i -X DELETE --url http://localhost:8001/routes/00134e96-0287-4644-b2ad-f43ee61abae0

curl -i -X PATCH \
  --url http://localhost:8001/services/2a13f17f-836e-4a72-9569-4d7fa7bbc3d3/routes/b130fd49-66a2-4cf6-a805-8fe03618123b \
  --data 'paths[]=/'

# Forward request
curl -i -X GET \
  --url http://localhost:8000/ \
  --header 'Host: example.com'

curl -i -X GET \
  --url http://127.0.0.1:8000/v1/foo/xxyyzzz \
  --header 'Host: example.com'

curl -i -X GET \
  --url http://127.0.0.1:8000/v2/foo/xxyyzzz \
  --header 'Host: example.com'

curl -i -X GET \
  --url http://localhost:8000/bar \
  --header 'Host: example.com'

-- Script to find my machine''s IP
ip -4 -o a | cut -d ' '  -f 2,7 | cut -d '/' -f 1


Create plugins


Key authentication plugin

curl -i -X POST \
  --url http://localhost:8001/services/example-service/plugins/ \
  --data 'name=key-auth'


curl -i -X POST \
  --url http://localhost:8001/consumers/ \
  --data "username=Jason"

curl -i -X POST \
  --url http://localhost:8001/consumers/Jason/key-auth/ \
  --data 'key=secret'


  curl -i -X GET \
  --url http://localhost:8000 \
  --header "Host: example.com" \
  --header "apikey: secret"

  curl -i -X GET \
  --url http://localhost:8000/v2/foo/xxx \
  --header "Host: example.com" \
  --header "apikey: secret"


  curl -i -X GET \
  --url http://localhost:8000/bar \
  --header "Host: example.com" \
  --header "apikey: secret"


Rate limiting plugin

curl -X POST http://localhost:8001/services/example-service/plugins \
    --data "name=rate-limiting"  \
    --data "config.second=5" \
    --data "config.minute=100" \
    --data "config.hour=10000" \
    --data "config.policy=local"


curl -X GET http://localhost:8001/plugins

curl -X PATCH http://localhost:8001/plugins/a4033f18-133c-479d-ae40-afdb01d9cbe6  \
  --data "config.minute=100"

```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
