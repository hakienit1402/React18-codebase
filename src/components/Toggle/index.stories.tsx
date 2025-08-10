import type { Meta, StoryObj } from "@storybook/react";
import { Bold } from "lucide-react";
import { useState } from "react";

import { Toggle } from ".";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Basic: Story = {
  render: (args) => {
    const [pressed, setPressed] = useState(false);
    return (
      <Toggle {...args} pressed={pressed} onPressedChange={setPressed}>
        <Bold className="h-4 w-4" />
      </Toggle>
    );
  },
};
