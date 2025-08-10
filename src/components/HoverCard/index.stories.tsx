import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from ".";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger className="rounded border px-3 py-2">Hover me</HoverCardTrigger>
      <HoverCardContent>
        <div className="text-sm">This is hover card content</div>
      </HoverCardContent>
    </HoverCard>
  ),
};
