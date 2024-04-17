"use client";

// Form Validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

// Components
import { toast } from "sonner";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { Button, Input, Textarea } from "@nextui-org/react";

import { api } from "@/trpc/react";
import { RequestReportSchema } from "@/types/forms";
import { TRPCClientError } from "@trpc/client";

export default function RequestReportForm() {
  const form = useForm<z.infer<typeof RequestReportSchema>>({
    resolver: zodResolver(RequestReportSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      number: "",
      company: "",
      job: "",
      custom: "",
      message: "",
    },
  });

  const requestCustomReportRoute = api.report.requestCustomReport.useMutation();

  async function submitForm(values: z.infer<typeof RequestReportSchema>) {
    try {
      const data = await requestCustomReportRoute.mutateAsync(values);
      toast.success("Request Submitted", {
        description: data.message,
      });
      form.reset();
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast.error("Error", {
          description: error.message,
        });
      }
      form.reset();
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="grid gap-4 md:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Input
                  autoFocus
                  label="Name"
                  variant="bordered"
                  classNames={{
                    description: "text-sm",
                    label: "text-md font-abeezee font-bold",
                  }}
                  size="lg"
                  {...field}
                  isInvalid={form.formState.errors.name !== undefined}
                  errorMessage={form.formState.errors.name?.message}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Input
                  label="Email"
                  variant="bordered"
                  classNames={{
                    description: "text-sm",
                    label: "text-md font-abeezee font-bold",
                  }}
                  size="lg"
                  {...field}
                  isInvalid={form.formState.errors.email !== undefined}
                  errorMessage={form.formState.errors.email?.message}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <Input
                  label="Country"
                  variant="bordered"
                  classNames={{
                    description: "text-sm",
                    label: "text-md font-abeezee font-bold",
                  }}
                  size="lg"
                  {...field}
                  isInvalid={form.formState.errors.country !== undefined}
                  errorMessage={form.formState.errors.country?.message}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <Input
                  label="Phone Number"
                  variant="bordered"
                  classNames={{
                    description: "text-sm",
                    label: "text-md font-abeezee font-bold",
                    input:
                      "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                  }}
                  inputMode="tel"
                  type="number"
                  size="lg"
                  onWheel={(e) => e.currentTarget.blur()}
                  {...field}
                  isInvalid={form.formState.errors.number !== undefined}
                  errorMessage={form.formState.errors.number?.message}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <Input
                  label="Company Name"
                  variant="bordered"
                  classNames={{
                    description: "text-sm",
                    label: "text-md font-abeezee font-bold",
                  }}
                  size="lg"
                  {...field}
                  isInvalid={form.formState.errors.company !== undefined}
                  errorMessage={form.formState.errors.company?.message}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <Input
                  label="Job Title"
                  variant="bordered"
                  classNames={{
                    description: "text-sm",
                    label: "text-md font-abeezee font-bold",
                  }}
                  size="lg"
                  {...field}
                  isInvalid={form.formState.errors.job !== undefined}
                  errorMessage={form.formState.errors.job?.message}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="custom"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <Input
                  label="Customize Report"
                  variant="bordered"
                  classNames={{
                    description: "text-sm",
                    label: "text-md font-abeezee font-bold",
                  }}
                  size="lg"
                  {...field}
                  isInvalid={form.formState.errors.custom !== undefined}
                  errorMessage={form.formState.errors.custom?.message}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <Textarea
                  label="Message"
                  variant="bordered"
                  classNames={{
                    description: "text-sm",
                    label: "text-md font-abeezee font-bold",
                  }}
                  size="lg"
                  {...field}
                  isInvalid={form.formState.errors.message !== undefined}
                  errorMessage={form.formState.errors.message?.message}
                />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            color="primary"
            className="px-2 text-center font-abeezee text-lg font-bold md:col-span-2"
            isDisabled={requestCustomReportRoute.isPending}
            isLoading={requestCustomReportRoute.isPending}
          >
            Request Report
          </Button>
        </form>
      </Form>
    </>
  );
}
