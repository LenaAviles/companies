import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils.js';

db.setUpConnection();

const app = express();

app.use( bodyParser.json() );

app.use(cors( { origin: '*'}) );

app.get('/companies', (req, res) => {
    db.listCompanies().then(data => res.send(data), function(reason) {
        console.log(reason); // Ошибка!
      });
});

app.post('/companies', (req, res) => {    
    db.createCompany(req.body).then(data => res.send(data), function(reason) {
        console.log(reason); // Ошибка!
      });
});

app.delete('/companies/:id', (req, res) => {        
    db.deleteCompany(req.params.id).then(data => res.send(data), function(reason) {
        console.log(reason); // Ошибка!
      });         
});

app.patch('/companies', (req, res) => {    
    db.updateCompany(req.body).then(data => res.send(data), function(reason) {        
        console.log(reason); // Ошибка!
      });
});

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});