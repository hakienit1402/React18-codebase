import type { Meta, StoryObj } from "@storybook/react";

import { ScrollArea } from ".";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Basic: Story = {
  render: () => (
    <div className="h-40 w-64">
      <ScrollArea className="h-full w-full rounded border p-2">
        <div className="space-y-2">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="rounded bg-common-surface p-2">
              Item {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};
