import type { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import FileAttachmentField from "./FileAttachmentField";
import { MAX_SIZE_IN_BYTES } from "@/components/FileAttachment";

type FormValues = {
  file: File | undefined;
};

const meta: Meta<typeof FileAttachmentField> = {
  title: "Form/FileAttachmentField",
  component: FileAttachmentField as any,
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    hasAsterisk: { control: "boolean" },
    disabled: { control: "boolean" },
    maxSizeInBytes: { control: "number" },
  },
};

export default meta;

type Story = StoryObj<typeof FileAttachmentField>;

function RHFWrapper(props: any) {
  const methods = useForm<FormValues>({ mode: "onChange", defaultValues: { file: undefined } });
  return (
    <FormProvider {...methods}>
      <form className="space-y-4">
        <FileAttachmentField<FormValues, "file"> {...props} />
      </form>
    </FormProvider>
  );
}

export const Basic: Story = {
  render: (args) => <RHFWrapper {...args} />,
  args: {
    name: "file",
    label: "Upload File",
    textObject: {
      label: "Drag and drop",
      description: "PNG, JPG, or PDF",
      buttonText: "Browse",
      maxSizeText: "10MB",
    },
    maxSizeInBytes: MAX_SIZE_IN_BYTES,
  },
};
