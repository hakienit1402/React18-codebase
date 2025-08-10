import type { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import CheckboxGroupField from "./CheckboxGroupField";
import type { SelectOptionTypes } from "@/components/SelectInput";

type FormValues = {
  fruits: SelectOptionTypes[];
};

const meta: Meta<typeof CheckboxGroupField> = {
  title: "Form/CheckboxGroupField",
  component: CheckboxGroupField as any,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    hasAsterisk: { control: "boolean" },
    hideErrorMessage: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroupField>;

function RHFWrapper(props: any) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      fruits: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-4">
        <CheckboxGroupField<FormValues, "fruits"> {...props} />
      </form>
    </FormProvider>
  );
}

const sampleOptions: SelectOptionTypes[] = [
  { label: "Apple", value: "apple", unique: "1" },
  { label: "Banana", value: "banana", unique: "2" },
  { label: "Cherry", value: "cherry", unique: "3" },
];

export const Basic: Story = {
  render: (args) => <RHFWrapper {...args} />,
  args: {
    name: "fruits",
    label: "Select fruits",
    options: sampleOptions,
  },
};
