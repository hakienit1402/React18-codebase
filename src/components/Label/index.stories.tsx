import type { Meta, StoryObj } from "@storybook/react";
import { Label } from ".";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Basic: Story = {
  render: () => (
    <label className="flex items-center gap-2">
      <Label htmlFor="email">Email</Label>
      <input id="email" className="rounded border bg-transparent px-2 py-1" />
    </label>
  ),
};
