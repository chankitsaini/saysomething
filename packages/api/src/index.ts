import type { AppRouter } from "./root-router";
import type { inferRouterOutputs } from "@trpc/server";
import { appRouter } from "./root-router";
import { createTRPCContext } from "./trpc";

type RouterOutputs = inferRouterOutputs<AppRouter>;

export { createTRPCContext, appRouter };
export type { AppRouter, RouterOutputs };
