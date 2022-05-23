import Joi from "joi";

const PointCollectionPayloadSchema = Joi.object({
    type: Joi.string().required(),
    data: Joi.any()
});

export default PointCollectionPayloadSchema