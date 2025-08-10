import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "@storybook/test";
import { FormProvider, useForm } from "react-hook-form";

import SelectField from "./SelectField";

import type { OptionType } from "@/components/SelectInput";

type FormValues = {
  country: OptionType | null;
};

const meta: Meta<typeof SelectField> = {
  title: "Form/SelectField",
  component: SelectField as any,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    hasAsterisk: { control: "boolean" },
    isMulti: { control: "boolean" },
    readOnly: { control: "boolean" },
    size: { control: { type: "select" }, options: ["small", "medium"] },
  },
};

export default meta;

type Story = StoryObj<typeof SelectField>;

function RHFWrapper(props: any) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { country: null },
  });

  return (
    <FormProvider {...methods}>
      <form className="max-w-input space-y-4">
        <SelectField<FormValues, "country"> {...props} />
      </form>
    </FormProvider>
  );
}

const options: OptionType[] = [
  { label: "Vietnam", value: "VN" },
  { label: "Singapore", value: "SG" },
  { label: "United States", value: "US" },
];

export const Basic: Story = {
  render: (args) => <RHFWrapper {...args} />,
  args: {
    name: "country",
    label: "Country",
    options,
    placeholder: "Select country",
    isClearable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Select country"));
    const combobox = canvas.getByRole("combobox");
    await userEvent.type(combobox, "Singapore");
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(canvas.getByText("Singapore")).toBeTruthy());
  },
};
