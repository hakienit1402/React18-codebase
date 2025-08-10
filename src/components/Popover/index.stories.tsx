import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from ".";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger className="rounded border px-3 py-2">Open</PopoverTrigger>
      <PopoverContent>
        <div className="p-2">Popover content</div>
      </PopoverContent>
      <PopoverAnchor />
    </Popover>
  ),
};
