import type { Meta, StoryObj } from "@storybook/react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from ".";

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
};

export default meta;

type Story = StoryObj<typeof ResizablePanelGroup>;

export const Basic: Story = {
  render: () => (
    <div className="h-60 w-[600px] border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} className="p-2">
          Left panel
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} className="p-2">
          Right panel
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
