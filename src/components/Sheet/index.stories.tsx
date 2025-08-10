import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from ".";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const Basic: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger className="rounded border px-3 py-2">Open sheet</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Short description</SheetDescription>
        </SheetHeader>
        <div className="p-4">Content here</div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
