import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from ".";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  args: {
    variant: "info",
    message: "This is an info alert",
    isDefaultAlert: true,
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Basic: Story = {};
export const Success: Story = { args: { variant: "success", message: "Success alert" } };
export const Error: Story = { args: { variant: "error", message: "Error alert" } };
