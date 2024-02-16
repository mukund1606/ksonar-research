import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const reportRoute = createTRPCRouter({
  getAllReports: publicProcedure.query(async ({ ctx }) => {
    const reports = ctx.db.report.findMany({
      orderBy: { createdAt: "desc" },
    });
    return reports;
  }),
  getReport: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const report = ctx.db.report.findUnique({
        where: { id: input.id },
      });
      return report;
    }),
});
