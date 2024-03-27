import { z } from "zod";

const dateStringSchema = z.date().transform((date) => date.toISOString());

const stringDateSchema = z.string().transform((date) => new Date(date));

export { dateStringSchema, stringDateSchema };
