import Joi from 'joi'

const UserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  role: Joi.string(),
  latitude: Joi.string(),
  longitude: Joi.string()
});

export default UserPayloadSchema