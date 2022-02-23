import Joi from "joi";

const geometry = Joi.object({
    coordinates: Joi.array().items(Joi.number()).required(),
    type: Joi.string()
})

const property = Joi.object({
    text: Joi.string().required()
})

const point = Joi.object({
    geometry: geometry,
    properties: property,
    type: Joi.string()
})

const PointCollectionPayloadSchema = Joi.object({
    type: Joi.string().required(),
    data: Joi.array().items(point)
});

export default PointCollectionPayloadSchema