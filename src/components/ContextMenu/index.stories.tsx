import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from ".";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Basic: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="rounded border px-3 py-2">Right click me</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Options</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
        <ContextMenuCheckboxItem checked>Enabled</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
