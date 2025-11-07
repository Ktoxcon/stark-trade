import { z } from "zod";

export const PaginationRequestParams = z.object({
  nextToken: z.string().nonempty().optional(),
});
