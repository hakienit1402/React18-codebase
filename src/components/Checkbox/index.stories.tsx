import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Checkbox } from ".";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  render: (args) => {
    const [checked, setChecked] = useState<boolean | "indeterminate" | undefined>(false);
    return (
      <label className="flex items-center gap-2">
        <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
        <span>Accept terms</span>
      </label>
    );
  },
};
