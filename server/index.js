const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');
const db = require('./config/database');

require('dotenv').config({ path: 'variables.env' });

const app = express();

db.authenticate()
    .then(() => console.log('DB Conectada'))
    .catch(error => console.log(error))
//HABILITAR PUG
app.set('view engine', 'pug');
//Añadir vistas
app.set('views', path.join(__dirname, './views'));
//Cargar carpeta estatica llamada public, que contiene css, js  e img
app.use(express.static('public'));

//Validar si estamos en desarrolllo o produccion
const config = configs[app.get('env')];
//Creamos la variable para el sitio web
app.locals.titulo = config.nameSite;

//Muestra el año actual y genera la ruta para pasar al menu y seleccionar link correspondiente
app.use((req, res, next) =>{
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
});

//Ejecutamos el body parser
app.use(bodyParser.urlencoded({extended: true}));
//Cargar las rutas
app.use('/', routes());

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});
