import Joi from "joi";

const PointCollectionPayloadSchema = Joi.object({
    type: Joi.string().required(),
    latitudes: Joi.array().items(Joi.number()).required(),
    longitudes: Joi.array().items(Joi.number()).required()
});

export default PointCollectionPayloadSchema