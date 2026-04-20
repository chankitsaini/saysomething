import { z } from "zod";

export const createBlockInput = z.object({
  blockingId: z.string(),
});
