import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "Type something...",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  render: (args) => {
    const [val, setVal] = useState("");
    return (
      <div className="w-80">
        <Input
          {...args}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          startAdornment={<Search className="h-4 w-4" />}
        />
      </div>
    );
  },
};
