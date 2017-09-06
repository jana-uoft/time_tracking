import express from 'express';
import UsersController from '../controllers/users';
import PromiseRouter from 'express-promise-router';
const router = PromiseRouter();
import { validateParam, validateBody, schemas } from '../helpers/routeHelpers';



router.route('/')
  .get(UsersController.index)
  .post(validateBody(schemas.userSchema), UsersController.create)

router.route('/:id')
  .get(validateParam(schemas.idSchema, 'id'), UsersController.show)
  .put(validateParam(schemas.idSchema, 'id'), validateBody(schemas.userSchema), UsersController.update)
  .patch(validateParam(schemas.idSchema, 'id'), validateBody(schemas.userSchemaOptional), UsersController.replace)
  .delete(validateParam(schemas.idSchema, 'id'), UsersController.delete)


export default router;

