const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const ongController = require('./controllers/OngController');
const casosController = require('./controllers/CasosController');
const profController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', sessionController.create);

routes.get('/ongs', ongController.index );


routes.post('/ongs',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),

  })
}), ongController.create );

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),  
  }).unknown(),

}),profController.index);

routes.post('/casos', casosController.create);

routes.get('/casos', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), casosController.index);


routes.delete('/casos/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}) , casosController.delete);

 module.exports = routes;
 
 