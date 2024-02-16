import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const reportRoute = createTRPCRouter({
  getAllReports: publicProcedure.query(async ({ ctx }) => {
    const reports = ctx.db.report.findMany({
      orderBy: { createdAt: "desc" },
    });
    return reports;
  }),
});
