import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "@storybook/test";
import { FormProvider, useForm } from "react-hook-form";

import TextareaField from "./TextareaField";

type FormValues = {
  description: string;
};

const meta: Meta<typeof TextareaField> = {
  title: "Form/TextareaField",
  component: TextareaField as any,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    description: { control: "text" },
    hasAsterisk: { control: "boolean" },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    autoTrim: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof TextareaField>;

function RHFWrapper(props: any) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { description: "" },
  });

  return (
    <FormProvider {...methods}>
      <form className="max-w-input space-y-4">
        <TextareaField<FormValues, "description"> {...props} />
      </form>
    </FormProvider>
  );
}

export const Basic: Story = {
  render: (args) => <RHFWrapper {...args} />,
  args: {
    name: "description",
    label: "Description",
    placeholder: "Enter description...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Description");
    await userEvent.type(input, "Hello world");
    await waitFor(() => expect((input as HTMLTextAreaElement).value).toBe("Hello world"));
  },
};
