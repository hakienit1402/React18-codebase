import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Switch } from ".";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <label className="flex items-center gap-2">
        <Switch {...args} checked={checked} onCheckedChange={setChecked} />
        <span>Notifications</span>
      </label>
    );
  },
};
