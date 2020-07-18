import express from 'express';

import Routes from './src/routes'
const app = express();

app.use(express.json());
app.use(Routes);


app.listen(3333,() => {
    console.log('Server run http://localhost:3333')
})