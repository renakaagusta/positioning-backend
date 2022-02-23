import Joi from "joi";

const ReportPayloadSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    rider: Joi.string().required(),
    category: Joi.string().required(),
});

export default ReportPayloadSchema
