import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from ".";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <ToastProvider>
        <button className="rounded border px-3 py-2" onClick={() => setOpen(true)}>
          Show Toast
        </button>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="flex w-full items-center justify-between p-4">
            <div>
              <ToastTitle>Notification</ToastTitle>
              <ToastDescription>Task completed successfully</ToastDescription>
            </div>
            <ToastClose />
          </div>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};
