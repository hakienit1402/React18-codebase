import type { Meta, StoryObj } from "@storybook/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ".";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger className="rounded border px-3 py-2">Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Short description</DialogDescription>
        </DialogHeader>
        <div className="py-4">Content goes here</div>
        <DialogFooter>
          <button className="rounded border px-3 py-2">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
