## Uploading videos using the Rewatch API
> Eqivalent implementation to upload and publish files on rewatch
[Rewatch File Upload using ROR & GQL ](https://help.rewatch.com/en/articles/5687776-uploading-videos-using-the-rewatch-api) using Express & Typescript.

Application includes MVC and Service pattern for the implementation. A REST endpoint which forward the request to service class, then later on service will forward request to proxy class which actually make the 3rd party to calls to external gateways using Fetch library.

## Steps

- copy .env.example file and create .env file to configure env variables
- npm i to install the dependencies
- nodemon server.ts