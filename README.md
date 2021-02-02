# Marvel API Integration
This is an API that integrates with Marvel API

Developer: Ryan Gunawardana (ryanmgunawardana@gmail.com)

# Implementation Highlights


## Application Services Map
![Application Service Map](https://user-images.githubusercontent.com/26731966/106604100-21b7e180-659a-11eb-9353-ed0142774619.png)


## Caching strategy used - ETAG
![Cache solution 1](https://user-images.githubusercontent.com/26731966/106604127-2da3a380-659a-11eb-818e-a73bc579da95.png)



## Swagger / OpenAPI Documentation
After running the app proceed to these links: 

Docs: http://localhost:3000/docs

Doc spec: http://localhost:3000/docs/spec



## Initial Configurations

The app directory of your application will contain a .env.example file.

Copy and rename `.env.example` to `.env` and the appropriate env variables


#### Environment Variables

| Variable | Description | Default Value
| --- | --- | :---:
| `MARVEL_API_BASE_URL` | Marvel API base url | https://gateway.marvel.com
| `MARVEL_API_PUBLIC_KEY` | Your Marvel public key | 
| `MARVEL_API_PRIVATE_KEY` | Your Marvel private key |
| `REDIS_HOST` | Redis server host | 127.0.0.1
| `REDIS_PASSWORD` | Redis server password | 
| `REDIS_PORT` | Redis server port | 6379
| `REDIS_CACHE_TTL_IN_SECONDS` | Cache TTL expiry in seconds | 3600

For the Marvel API private & public keys (get yours in https://developer.marvel.com)

After these steps you can proceed to the running your app section.



## Running the app
Before proceeding please be sure you are done with setting up your Initial Configurations

#### Running with Docker

##### Requirements

* Docker (https://www.docker.com/)

On the main directory run the docker-compose:

```shell
$ docker-compose up
```

Then open http://localhost:3000/docs





#### Installing and running locally

##### Requirements

* Node.js v14 (https://nodejs.org/en/)
* Redis (for caching) (https://redis.io/)
* Yarn (https://classic.yarnpkg.com/en/docs/install/#windows-stable)

##### Steps

On the main directory run:
```shell
$ yarn install
$ yarn start
``` 
Then open http://localhost:3000/docs

##### To run tests
```shell
$ yarn test
``` 



# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
