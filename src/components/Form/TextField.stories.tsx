import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "@storybook/test";
import { useForm, FormProvider } from "react-hook-form";

import TextField from "./TextField";

type FormValues = {
  username: string;
  password: string;
};

const meta: Meta<typeof TextField> = {
  title: "Form/TextField",
  component: TextField as any,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    description: { control: "text" },
    hasAsterisk: { control: "boolean" },
    isLoading: { control: "boolean" },
    type: { control: { type: "select" }, options: ["text", "password", "email"] },
    disabled: { control: "boolean" },
    autoTrim: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

function RHFWrapper(props: any) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  return (
    <FormProvider {...methods}>
      <form className="max-w-input space-y-4">
        <TextField<FormValues, "username"> {...props} />
      </form>
    </FormProvider>
  );
}

export const Basic: Story = {
  render: (args) => <RHFWrapper {...args} />,
  args: {
    name: "username",
    label: "Username",
    placeholder: "Enter username",
    description: "Your unique username",
    hasAsterisk: false,
    isLoading: false,
    autoTrim: true,
    type: "text",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Username");
    await userEvent.type(input, "john");
    await waitFor(() => expect((input as HTMLInputElement).value).toBe("john"));
  },
};

export const Password: Story = {
  render: (args) => <RHFWrapper {...args} />,
  args: {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    hasAsterisk: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    await userEvent.type(input, "secret");
    await waitFor(() => expect((input as HTMLInputElement).value).toBe("secret"));
  },
};
