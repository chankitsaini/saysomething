import { block } from "@repo/db/drizzle-schema";

import { createUserIfNotExists } from "../auth/auth-utils";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { createBlockInput } from "./block-schema";

export const blockRouter = createTRPCRouter({
  createBlock: publicProcedure.input(createBlockInput).mutation(async ({ ctx, input }) => {
    const userId = await createUserIfNotExists(ctx);

    const [created] = await ctx.db
      .insert(block)
      .values({
        blockerId: userId,
        blockingId: input.blockingId,
      })
      .returning();

    return {
      block: created,
    };
  }),
});
