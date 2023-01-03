import express from 'express';
import cors from 'cors';
import {connector} from './src/mysql-conector.js'
import { PORT } from './config.js';


const app = express();


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
    
// INSERTAR DATOS EN LA BASE DE DATOS

app.post('/create', (req, res) => {
    let resultado = req.body;

    // const insert = `INSERT INTO users (id, nombre, apellido, email, phone, perfil) VALUES (NULL, '${JSON.stringify(bdatos)}', "rodriguez", "rodrig@gmail.com", "756898766", "gastronomico")`;
    const insert = `INSERT INTO users (id, nombre, apellido, email, telefono, perfil, respuestas) VALUES (NULL, '${resultado[0]}', '${resultado[1]}', '${resultado[2]}', '${resultado[3]}', '${resultado[4]}', '${resultado[5]}')`;
    connector.query(insert, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify('Datos guardados'));
        console.log(result);
    });

});

/* app.post('/create', (req, res) => {
    bdatos = req.body;
    const insert = `INSERT INTO users (id, nombre) VALUES (NULL, '${JSON.stringify(bdatos)}')`;
    connector.query(insert, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify('Datos guardados'));
        console.log(result);
    });

}); */

app.listen(PORT);
console.log('Server on Port', PORT);