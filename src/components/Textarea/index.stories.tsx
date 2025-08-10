import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Textarea } from ".";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  render: (args) => {
    const [val, setVal] = useState("");
    return (
      <div className="w-[480px]">
        <Textarea {...args} value={val} onChange={(e) => setVal(e.target.value)} maxLength={200} />
      </div>
    );
  },
};
