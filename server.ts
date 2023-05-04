require('./src/global')
import * as dotenv from 'dotenv';

dotenv.config();
import config from "config";


const app = require('./src/app');
const port = config.get('port') as number;
const host = config.get('host') as string;

app.listen(port, host, () => {
    console.log(`server connected on port:`, `http://${host}:${port}`)
});