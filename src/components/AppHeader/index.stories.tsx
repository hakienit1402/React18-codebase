import type { Meta, StoryObj } from "@storybook/react";

import { AppHeader } from ".";

const meta: Meta<typeof AppHeader> = {
  title: "Components/AppHeader",
  component: AppHeader,
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

export const Basic: Story = {
  render: () => (
    <AppHeader title={<h1 className="text-3xl font-bold">Dashboard</h1>} moduleName="Users" />
  ),
};
