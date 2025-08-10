import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "@storybook/test";
import { useForm, FormProvider } from "react-hook-form";

import NumberField from "./NumberField";

type FormValues = {
  amount: string;
};

const meta: Meta<typeof NumberField> = {
  title: "Form/NumberField",
  component: NumberField as any,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    description: { control: "text" },
    hasAsterisk: { control: "boolean" },
    isLoading: { control: "boolean" },
    thousandSeparator: { control: "boolean" },
    decimalScale: { control: "number" },
    allowNegative: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof NumberField>;

function RHFWrapper(props: any) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { amount: "" },
  });

  return (
    <FormProvider {...methods}>
      <form className="max-w-input space-y-4">
        <NumberField<FormValues, "amount"> {...props} />
      </form>
    </FormProvider>
  );
}

export const Basic: Story = {
  render: (args) => <RHFWrapper {...args} />,
  args: {
    name: "amount",
    label: "Amount",
    placeholder: "Enter amount",
    thousandSeparator: true,
    decimalScale: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Amount");
    await userEvent.type(input, "123.45");
    await waitFor(() => expect((input as HTMLInputElement).value).toMatch(/123\.45/));
  },
};
