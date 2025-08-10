import type { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import BooleanCheckboxGroupField from "./BooleanCheckboxGroupField";

type FormValues = {
  toggles: Record<string, boolean>;
};

const meta: Meta<typeof BooleanCheckboxGroupField> = {
  title: "Form/BooleanCheckboxGroupField",
  component: BooleanCheckboxGroupField as any,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    hasAsterisk: { control: "boolean" },
    hideErrorMessage: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof BooleanCheckboxGroupField>;

function RHFWrapper(props: any) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { toggles: {} },
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-4">
        <BooleanCheckboxGroupField<FormValues, "toggles"> {...props} />
      </form>
    </FormProvider>
  );
}

const sampleOptions = [
  { key: "a", label: "Enable A" },
  { key: "b", label: "Enable B", description: "Optional toggle" },
  { key: "c", label: "Enable C", disabled: true },
];

export const Basic: Story = {
  render: (args) => <RHFWrapper {...args} />,
  args: {
    name: "toggles",
    label: "Feature toggles",
    options: sampleOptions,
  },
};
