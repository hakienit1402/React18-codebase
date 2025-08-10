import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from ".";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {
  render: () => (
    <Avatar>
      <AvatarImage alt="User" src="https://i.pravatar.cc/100" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};
