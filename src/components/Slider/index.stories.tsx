import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Slider } from ".";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState<number[]>([50]);
    return (
      <div className="w-80">
        <Slider {...args} value={value} onValueChange={setValue} max={100} step={1} />
        <div className="mt-2 text-sm">Value: {value[0]}</div>
      </div>
    );
  },
};
