import type { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import SegmentedField from "./SegmentedField";

type FormValues = {
  view: string;
};

const meta: Meta<typeof SegmentedField> = {
  title: "Form/SegmentedField",
  component: SegmentedField as any,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    hasAsterisk: { control: "boolean" },
    isOutputOption: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedField>;

function RHFWrapper(props: any) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { view: "list" },
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-4">
        <SegmentedField<FormValues, "view"> {...props} />
      </form>
    </FormProvider>
  );
}

const options = [
  { label: "List", value: "list" },
  { label: "Grid", value: "grid" },
  { label: "Compact", value: "compact" },
];

export const Basic: Story = {
  render: (args) => <RHFWrapper {...args} />,
  args: {
    name: "view",
    label: "View Mode",
    options,
  },
};
