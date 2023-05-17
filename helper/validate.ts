import Joi from 'joi';

export class validate{
    userValidate= Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone:Joi.string().min(10).required(),
      });
    
}
