import {
  clientDecryption,
  comparePassword,
  saltPassword,
  serverDecrypt,
} from "@/lib/utils";
import { reportRoute } from "@/server/api/routers/report";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ChangePasswordFormSchema } from "@/types/forms";
import { TRPCError } from "@trpc/server";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  report: reportRoute,
  changePassowrd: protectedProcedure
    .input(ChangePasswordFormSchema)
    .mutation(async ({ ctx, input }) => {
      const username = ctx.session.user.username;
      const user = await ctx.db.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }
      const pass = clientDecryption(input.oldPassword);
      const passFromDB = serverDecrypt(user.password);
      const isMatch = comparePassword(pass, passFromDB);
      if (!isMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Old Password is Incorrect",
        });
      }
      const { encryptedPassword } = saltPassword(
        clientDecryption(input.password),
      );
      await ctx.db.user.update({
        where: {
          username,
        },
        data: {
          password: encryptedPassword,
        },
      });
      return {
        message: "Password Changed Successfully",
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
