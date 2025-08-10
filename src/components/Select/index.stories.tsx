import type { Meta, StoryObj } from "@storybook/react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from ".";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  render: () => (
    <div className="w-64">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
