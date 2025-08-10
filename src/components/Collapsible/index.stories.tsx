import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from ".";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="rounded border px-3 py-2">
          {open ? "Hide" : "Show"}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 rounded border p-3">Hidden content</div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
