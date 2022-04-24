import Joi from "joi";

const ReportPayloadSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    rider: Joi.string().required(),
    handler: Joi.string(),
    category: Joi.string().required(),
    startingPoint: Joi.number().required(),
    endPoint: Joi.number().required(),
    type: Joi.string().required(),
    createdAt: Joi.string().required()
});

export default ReportPayloadSchema