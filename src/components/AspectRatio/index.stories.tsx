import type { Meta, StoryObj } from "@storybook/react";

import { AspectRatio } from ".";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Basic: Story = {
  render: () => (
    <div className="w-[360px]">
      <AspectRatio ratio={16 / 9}>
        <img src="https://placehold.co/640x360" className="h-full w-full rounded object-cover" />
      </AspectRatio>
    </div>
  ),
};
