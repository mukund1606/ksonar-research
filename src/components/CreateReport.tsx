"use client";

// Form Validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

// Components
import { toast } from "sonner";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@nextui-org/react";

import { UploadButton } from "@/lib/uploadthing";
import { api } from "@/trpc/react";
import { CreateReportFormSchema, IndustrySchema } from "@/types/forms";
import { TRPCClientError } from "@trpc/client";
import { useEffect, useState } from "react";

export default function CreateReportForm({
  onCreateReportClose,
}: {
  onCreateReportClose: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const form = useForm<z.infer<typeof CreateReportFormSchema>>({
    resolver: zodResolver(CreateReportFormSchema),
    defaultValues: {
      title: "",
      description: "",
      fileUrl: "",
      fileId: "",
      isTopReport: false,
    },
  });

  const apiUtils = api.useUtils();
  const addReportRoute = api.report.addReport.useMutation({
    onSuccess: async () => {
      await apiUtils.report.getAllReports.invalidate();
    },
  });
  const { mutateAsync: cancelRouteMutateAsync } =
    api.report.cancelUpload.useMutation({
      onSuccess: async () => {
        await apiUtils.report.getAllReports.invalidate();
      },
    });

  useEffect(() => {
    function handleUnexpectedClose() {
      if (form.getValues("fileId") !== "") {
        cancelRouteMutateAsync({ id: form.getValues("fileId") }).catch(
          (error) => {
            if (error instanceof TRPCClientError) {
              toast.error("Error", {
                description: error.message,
              });
            }
          },
        );
      }
    }
    window.addEventListener("beforeunload", handleUnexpectedClose);
    return () =>
      window.removeEventListener("beforeunload", handleUnexpectedClose);
  }, [form, cancelRouteMutateAsync]);

  async function submitForm(values: z.infer<typeof CreateReportFormSchema>) {
    try {
      onCreateReportClose();
      await addReportRoute.mutateAsync(values);
      toast.success("Success", {
        description: "Report Created Successfully.",
      });
      form.reset();
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast.error("Error", {
          description: error.message,
        });
        form.reset();
      }
    }
  }

  async function handleCancel() {
    try {
      if (form.getValues("fileId") !== "") {
        await cancelRouteMutateAsync({ id: form.getValues("fileId") });
      }
      onCreateReportClose();
      form.reset();
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast.error("Error", {
          description: error.message,
        });
        form.reset();
      }
    }
  }

  return (
    <>
      <div className="flex w-full justify-center md:py-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="flex w-full flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Input
                    autoFocus
                    label="Title"
                    variant="bordered"
                    classNames={{
                      description: "text-sm",
                      label: "text-md font-abeezee font-bold",
                    }}
                    size="lg"
                    {...field}
                    isInvalid={form.formState.errors.title !== undefined}
                    errorMessage={form.formState.errors.title?.message}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    label="Description"
                    variant="bordered"
                    classNames={{
                      description: "text-sm",
                      label: "text-md font-abeezee font-bold",
                    }}
                    size="lg"
                    {...field}
                    isInvalid={form.formState.errors.description !== undefined}
                    errorMessage={form.formState.errors.description?.message}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <Select
                    label="Industry"
                    variant="bordered"
                    classNames={{
                      description: "text-sm",
                      label: "text-md font-abeezee font-bold",
                    }}
                    defaultSelectedKeys={["Food"]}
                    size="lg"
                    {...field}
                    isRequired
                    isInvalid={form.formState.errors.industry !== undefined}
                    errorMessage={form.formState.errors.industry?.message}
                  >
                    {IndustrySchema._def.values.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTopReport"
              render={({ field }) => (
                <FormItem>
                  <Switch
                    classNames={{
                      label: "text-md font-abeezee font-bold",
                    }}
                    size="lg"
                    isSelected={field.value}
                    onValueChange={field.onChange}
                  >
                    Top Result?
                  </Switch>
                  <FormMessage />
                </FormItem>
              )}
            />
            <>
              <FormField
                control={form.control}
                name="fileId"
                render={() => (
                  <FormItem>
                    {fileName === "" ? (
                      <UploadButton
                        endpoint="docsUploader"
                        onUploadBegin={() => {
                          setIsUploading(true);
                        }}
                        onClientUploadComplete={(files) => {
                          const file = files[0];
                          if (!file) return;
                          setFileName(file?.name);
                          form.setValue("fileUrl", file?.url);
                          form.setValue("fileId", file?.key);
                          setIsUploading(false);
                        }}
                      />
                    ) : (
                      <p>{fileName}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="submit"
                  color="primary"
                  className="px-2 text-center font-abeezee text-lg font-bold"
                  isDisabled={isUploading}
                >
                  Create Report
                </Button>
                <Button
                  type="button"
                  color="danger"
                  className="px-2 text-center font-abeezee text-lg font-bold"
                  isDisabled={isUploading}
                  onPress={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </>
          </form>
        </Form>
      </div>
    </>
  );
}
