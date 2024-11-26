import { z } from "zod";

const privateConfigSchema = z.object({
  ADMIN_EMAILS: z.string().optional(),
  TEST_EMAIL_TOKEN: z.string().optional(),


  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_ACCESS_KEY: z.string(),
  S3_IMAGES_BUCKET: z.string(),
  S3_ENDPOINT: z.string(),
  S3_REGION: z.string(),
});

export const privateConfig = privateConfigSchema.parse(process.env);