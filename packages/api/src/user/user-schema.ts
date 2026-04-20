import { z } from "zod";

const userMetadata = z.object({
  avatarUrl: z.string().optional(),
  displayName: z.string().optional(),
});

const createUserInput = z
  .object({
    email: z.string().email().optional(),
  })
  .merge(userMetadata);

export const getUserInput = z
  .object({
    userId: z.string(),
  })
  .required();

export const updateUserInput = z
  .object({
    userId: z.string(),
  })
  .merge(createUserInput);
export type UpdateUserInput = z.infer<typeof updateUserInput>;

export const getUserStatsInput = z.object({
  userId: z.string(),
});
