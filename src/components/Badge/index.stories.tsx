import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from ".";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: {
    children: "Badge",
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Basic: Story = {};
export const Warning: Story = { args: { variant: "warning", children: "Warning" } };
export const Success: Story = { args: { variant: "success", children: "Success" } };
export const Info: Story = { args: { variant: "info", children: "Info" } };
export const Error: Story = { args: { variant: "error", children: "Error" } };
