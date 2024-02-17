import { getServerAuthSession } from "@/server/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  docsUploader: f({
    pdf: { maxFileSize: "4MB" },
  })
    .middleware(async () => {
      const session = await getServerAuthSession();
      if (!session) throw new UploadThingError("Unauthorized");
      return {
        userId: session.user.id,
      };
    })
    .onUploadComplete(({ metadata, file }) => {
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
