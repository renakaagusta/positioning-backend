import Joi from "joi";

const route = Joi.object({
    from: Joi.string().required(),
    to: Joi.array().items(Joi.string()).required()
})

const RouteCollectionPayloadSchema = Joi.object({
    type: Joi.string().required(),
    routes: Joi.array().items(route)
});

export default RouteCollectionPayloadSchema