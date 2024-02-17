"use client";

// React
import { useState } from "react";

// Next Auth
import { signIn } from "next-auth/react";

// Form Validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

// Icons
import { Eye, EyeOff } from "lucide-react";

// Components
import { toast } from "sonner";

import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";

// Utils
import { clientEncryption } from "@/lib/utils";
import { LoginFormSchema } from "@/types/forms";

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function submitForm(values: z.infer<typeof LoginFormSchema>) {
    values.password = clientEncryption(values.password);
    try {
      await signIn("credentials", {
        ...values,
        callbackUrl: `/admin`,
      });
    } catch (error) {
      const e = error as { response: { data: string } };
      toast.error("Error", {
        description: e.response.data,
      });
      form.reset();
    }
  }
  return (
    <>
      <div className="-4 my-auto grid justify-center md:p-8">
        <Card className="max-w-[350px]">
          <CardHeader className="flex gap-3">
            <h1 className="w-full py-1 text-center font-fredoka text-4xl font-semibold lg:text-5xl">
              Login
            </h1>
          </CardHeader>
          <Divider />
          <CardBody className="gap-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitForm)}
                className="flex w-full flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        autoFocus
                        label="Username"
                        variant="bordered"
                        classNames={{
                          description: "text-sm",
                          label: "text-md font-abeezee font-bold",
                        }}
                        size="lg"
                        {...field}
                        isInvalid={form.formState.errors.username !== undefined}
                        errorMessage={form.formState.errors.username?.message}
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
                        label="Password"
                        type={isPasswordVisible ? "text" : "password"}
                        variant="bordered"
                        classNames={{
                          description: "text-sm",
                          label: "text-md font-abeezee font-bold",
                        }}
                        // isDisabled={isOTPVerified || isOTPButtonDisabled}
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
                  Login
                </Button>
              </form>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
