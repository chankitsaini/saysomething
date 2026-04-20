import { flag } from "@repo/db/drizzle-schema";
import { getDefaultValues } from "@repo/db/utils";

import { createUserIfNotExists } from "../auth/auth-utils";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { createFlagInput } from "./flag-schema";

export const flagRouter = createTRPCRouter({
  createFlag: publicProcedure.input(createFlagInput).mutation(async ({ ctx, input }) => {
    const userId = await createUserIfNotExists(ctx);

    const [created] = await ctx.db
      .insert(flag)
      .values({
        ...getDefaultValues({ withId: false }),
        postId: input.postId,
        userId,
      })
      .returning();

    return {
      flag: created,
    };
  }),
});
