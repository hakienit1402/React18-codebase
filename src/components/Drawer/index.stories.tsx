import type { Meta, StoryObj } from "@storybook/react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from ".";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger className="rounded border px-3 py-2">Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Short description</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Content here</div>
        <DrawerFooter>
          <DrawerClose className="rounded border px-3 py-2">Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
