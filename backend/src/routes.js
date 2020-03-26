const express = require('express');

const ongController = require('./controllers/OngController');
const casosController = require('./controllers/CasosController');
const profController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', sessionController.create);

routes.get('/ongs', ongController.index );
routes.post('/ongs', ongController.create );

routes.get('/profile', profController.index);

routes.post('/casos', casosController.create);
routes.get('/casos', casosController.index);
routes.delete('/casos/:id', casosController.delete);

 module.exports = routes;
 
 