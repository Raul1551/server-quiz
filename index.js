import express from 'express';
import cors from 'cors';
import {connector} from './src/mysql-conector.js'
import { PORT } from './config.js';


const app = express();

let bdatos;

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json({
    type: "*/*"
}));

app.use(cors());

app.get('/', (req, res) => {
     connector.query('SELECT * FROM users', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
    
// INSERTAR DATOS EN LA BASE DE DATOSs

app.post('/create', (req, res) => {
    bdatos = req.body;
    const insert = `INSERT INTO users (id, nombre) VALUES (NULL, '${JSON.stringify(bdatos)}')`;
    connector.query(insert, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify('Datos guardados'));
        console.log(result);
    });

});

app.listen(PORT);
console.log('Server on Port', PORT);