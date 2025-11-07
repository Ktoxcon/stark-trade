import { z } from "zod";

export const AuthRequestBodySchema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(8),
});
