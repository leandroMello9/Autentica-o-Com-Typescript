import {createConnection} from 'typeorm'

createConnection().then(() => console.log('Data base run'));