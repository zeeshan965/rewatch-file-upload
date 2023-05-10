import express, {NextFunction, Request, Response} from "express";
const api = require("./routes/index");
const path = require('path');
const app = express();
//const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World!')
})

app.use('/api', api);

module.exports = app;
