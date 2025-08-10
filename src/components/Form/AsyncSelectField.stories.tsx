import type { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import AsyncCreateableSelectField from "./AsyncSelectField";
import type { OptionType } from "@/components/SelectInput/AsyncCreateableSelectInput";

type FormValues = {
  tag: OptionType | null;
};

const meta: Meta<typeof AsyncCreateableSelectField> = {
  title: "Form/AsyncCreateableSelectField",
  component: AsyncCreateableSelectField as any,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    hasAsterisk: { control: "boolean" },
    isMulti: { control: "boolean" },
    minInputLength: { control: "number" },
    maxInputLength: { control: "number" },
  },
};

export default meta;

type Story = StoryObj<typeof AsyncCreateableSelectField>;

function RHFWrapper(props: any) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { tag: null },
  });

  const loadOptions = () => (inputValue: string, callback: (options: OptionType[]) => void) => {
    const all = [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Svelte", value: "svelte" },
    ];
    const filtered = all.filter((o) => o.label.toLowerCase().includes(inputValue.toLowerCase()));
    setTimeout(() => callback(filtered), 300);
  };

  return (
    <FormProvider {...methods}>
      <form className="max-w-input space-y-4">
        <AsyncCreateableSelectField<FormValues, "tag">
          {...props}
          loadOptions={loadOptions as any}
        />
      </form>
    </FormProvider>
  );
}

export const Basic: Story = {
  render: (args) => <RHFWrapper {...args} />,
  args: {
    name: "tag",
    label: "Tags",
    placeholder: "Type to search or create...",
    isClearable: true,
    isMulti: false,
  },
};
