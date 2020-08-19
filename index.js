'use strict';

(function() {

  const express = require('express')
  const app = express()
  var bodyParser = require('body-parser')
  
  const port = 3000
  //import User from './models/user';
  const models = require( './models/index');
  
  //const users = models.User.findAll();
  var jsonParser = bodyParser.json()
  models.User.findAll()
        .then( userResponse => {
            console.log(userResponse);
            
          //res.status( 200 ).json( userResponse )
        })
        .catch( error => {
          //res.status( 400 ).send( error )
          console.log(error);
          
        })
  
  
  
  
  app.get('/',  ( req, res, next ) => {
          models.User.findAll()
            .then( userResponse => {
              res.status( 200 ).json( userResponse )
            })
            .catch( error => {
              res.status( 400 ).send( error )
            })
        } )
  
  
  app.use('/api/users',jsonParser , require('./Controller/usersController'));
  app.use('/api/roles',jsonParser, require('./Controller/rolesController'));
  app.use('/api/categories', jsonParser, require('./Controller/categoriesController'));
  app.use('/api/inventories',jsonParser, require('./Controller/inventoriesController'));
  app.use('/api/products',jsonParser, require('./Controller/productsController'));
  app.use('/api/sales',jsonParser, require('./Controller/salesController'));
  app.use('/api/supliers',jsonParser, require('./Controller/supliersController'));
  app.use('/api/orders',jsonParser, require('./Controller/ordersController'));
  app.use('/api/login',jsonParser, require('./Controller/loginController'));
  app.use('/api/register',jsonParser, require('./Controller/registerController'));
  
  
  //console.log(users);
  
  
  app.listen(port, () => console.log(`Backend running on  http://localhost:${port}`))


  
}());

