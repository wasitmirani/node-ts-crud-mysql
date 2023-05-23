import express, { Request, Response, NextFunction } from 'express';
import  { UserController} from "../controllers/user.controller";
import {AuthController} from "../controllers/auth.controller";
import {validate} from "../helper/validate";
import { body } from 'express-validator';


let route = express.Router();

// mount express paths, any addition middleware can be added as well.
// ex. router.use('/pathway', middleware_function, sub-router);


// Home page route.
route.get('/', function (req, res) {
    res.send('Wiki home page');
  })
  
  // About page route.
  route.get('/about', function (req, res) {
    res.send('About this wiki');
  })


  const user_controller = new UserController();
  const auth_controller = new AuthController();

  let val= new validate();
  route.get('/users',user_controller.getUsers);
  route.post('/auth/login',auth_controller.login);
  route.post('/auth/register',auth_controller.register);
  route.post('/store-user',val.signupValidation,user_controller.storeUser);
  route.get('/dashboard',auth_controller.dashboard);
  // route.get('/user/:id',user_controller.findUser);
// Export the router
export = route;

