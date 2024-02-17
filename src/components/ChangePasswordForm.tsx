"use client";

// React
import { useState } from "react";

// Form Validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

// Icons
import { Eye, EyeOff } from "lucide-react";

// Components
import { toast } from "sonner";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { Button, Input } from "@nextui-org/react";

// Utils
import { clientEncryption } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ChangePasswordFormSchema } from "@/types/forms";
import { TRPCClientError } from "@trpc/client";

export default function ChangePasswordForm() {
  const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const changePasswordRoute = api.changePassowrd.useMutation();

  async function submitForm(values: z.infer<typeof ChangePasswordFormSchema>) {
    if (values.oldPassword === values.password) {
      toast.error("Error", {
        description: "Old password and new password cannot be the same",
      });
      form.reset();
      return;
    }
    values.oldPassword = clientEncryption(values.oldPassword);
    values.password = clientEncryption(values.password);
    try {
      await changePasswordRoute.mutateAsync(values);
      toast.success("Success", {
        description: "Password Changed Successfully",
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
  return (
    <>
      <div className="-4 my-auto grid justify-center md:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="flex w-full flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <Input
                    autoFocus
                    label="Old Password"
                    type={isPasswordVisible ? "text" : "password"}
                    variant="bordered"
                    classNames={{
                      description: "text-sm",
                      label: "text-md font-abeezee font-bold",
                    }}
                    size="lg"
                    {...field}
                    isInvalid={form.formState.errors.oldPassword !== undefined}
                    errorMessage={form.formState.errors.oldPassword?.message}
                    endContent={
                      <Button
                        type="button"
                        variant="light"
                        onPress={() => {
                          setIsPasswordVisible(!isPasswordVisible);
                        }}
                        isIconOnly
                        tabIndex={-1}
                      >
                        {isPasswordVisible ? <EyeOff /> : <Eye />}
                      </Button>
                    }
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Input
                    label="New Password"
                    type={isPasswordVisible ? "text" : "password"}
                    variant="bordered"
                    classNames={{
                      description: "text-sm",
                      label: "text-md font-abeezee font-bold",
                    }}
                    size="lg"
                    {...field}
                    isInvalid={form.formState.errors.password !== undefined}
                    errorMessage={form.formState.errors.password?.message}
                    endContent={
                      <Button
                        type="button"
                        variant="light"
                        onPress={() => {
                          setIsPasswordVisible(!isPasswordVisible);
                        }}
                        isIconOnly
                        tabIndex={-1}
                      >
                        {isPasswordVisible ? <EyeOff /> : <Eye />}
                      </Button>
                    }
                  />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              color="primary"
              className="px-2 text-center font-abeezee text-lg font-bold"
            >
              Change Password
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
