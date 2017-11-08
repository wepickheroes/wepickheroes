# We Pick Heroes

## Requirements

* [docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)
* [docker-compose](https://docs.docker.com/compose/install/#install-compose)
* [yarn](https://yarnpkg.com/en/docs/install)

## Install & Start Backend Dev Services

```
$ docker-compose build
$ docker-compose up
```

## Install & Start Frontend Dev Server

```
$ cd client && yarn
$ yarn start
```

## Deploy Frontend to Github Pages

```
$ cd client && yarn deploy
```

## TODO:
* Move client app to Docker
* Django + DRF backend
