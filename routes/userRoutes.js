import express from 'express';
import UserController from '../controllers/userController';
import PromiseRouter from 'express-promise-router';
const router = PromiseRouter();
import passport from '../passport';
import { validateParam, validateBody, schemas } from '../helpers/validationHelpers';

const passportSignIn = passport.authenticate('local', {session: false});
const passportJWT =  passport.authenticate('jwt', {session: false});

router.route('/register')
  .post(
    validateBody(schemas.userRegisterSchema), 
    UserController.regsiter
  )

router.route('/login')
  .post(
    validateBody(schemas.userLoginSchema), 
    passportSignIn, 
    UserController.login
  )

router.route('/delete/:email')
  .delete(
    validateParam(schemas.userDeleteSchema, 'email'), 
    passportJWT, 
    UserController.delete
  )


export default router;

