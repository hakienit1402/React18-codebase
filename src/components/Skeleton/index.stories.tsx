import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from ".";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  ),
};
