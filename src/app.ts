import express, {NextFunction, Request, Response} from "express";
// import * as md5 from 'md5';
//const md5 = require('md5');
import fetch from 'node-fetch';
const { GraphQLClient, gql } = require('graphql-request');

const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World!')
})


module.exports = app;
