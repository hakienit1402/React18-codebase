import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from ".";

const meta: Meta<typeof ToggleGroup> = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState("left");
    return (
      <ToggleGroup type="single" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["bold"]);
    return (
      <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};
