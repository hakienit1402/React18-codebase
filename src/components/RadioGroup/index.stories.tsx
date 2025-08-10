import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from ".";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState("apple");
    return (
      <RadioGroup value={value} onValueChange={setValue} className="gap-3">
        <label className="flex items-center gap-2">
          <RadioGroupItem value="apple" /> Apple
        </label>
        <label className="flex items-center gap-2">
          <RadioGroupItem value="banana" /> Banana
        </label>
      </RadioGroup>
    );
  },
};
