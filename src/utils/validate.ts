import joi, { AnySchema } from "@hapi/joi";
import { error } from "console";

export default function validate(data: any, schema: AnySchema) {
    const { error } = joi.object(schema).validate(data);
    return error;
}

