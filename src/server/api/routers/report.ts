import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { CreateReportFormSchema } from "@/types/forms";
import { TRPCError } from "@trpc/server";
import { UTApi } from "uploadthing/server";

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
  addReport: protectedProcedure
    .input(CreateReportFormSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.report.create({
          data: {
            title: input.title,
            description: input.description,
            industry: input.industry,
            fileUrl: input.fileUrl,
            fileID: input.fileId,
            isTopReport: input.isTopReport,
          },
        });
        return {
          message: "Report added successfully",
        };
      } catch (error) {
        const utapi = new UTApi();
        await utapi.deleteFiles(input.fileId);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error adding report",
        });
      }
    }),
  cancelUpload: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const utapi = new UTApi();
        await utapi.deleteFiles(input.id);
        return {
          message: "Upload cancelled successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error cancelling upload",
        });
      }
    }),
  changeTopStatus: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const report = await ctx.db.report.findUnique({
        where: { id: input.id },
      });
      if (!report) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Report not found",
        });
      }
      await ctx.db.report.update({
        where: { id: input.id },
        data: {
          isTopReport: !report.isTopReport,
        },
      });
      return {
        message: "Report updated successfully",
      };
    }),
  deleteReport: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const utapi = new UTApi();
      const report = await ctx.db.report.findUnique({
        where: { id: input.id },
      });
      if (!report) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Report not found",
        });
      }
      try {
        await utapi.deleteFiles(report.fileID);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error deleting report",
        });
      } finally {
        await ctx.db.report.delete({
          where: { id: input.id },
        });
      }
      return {
        message: "Report deleted successfully",
      };
    }),
  getRandomReport: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // Any report except the one with the given id
      const reports = await ctx.db.report.findMany({
        where: {
          id: { not: input.id },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const threeRandomReports = reports
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      return threeRandomReports;
    }),
});
