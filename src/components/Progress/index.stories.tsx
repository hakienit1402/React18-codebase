import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Progress } from ".";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 10)), 500);
      return () => clearInterval(id);
    }, []);
    return (
      <div className="w-80">
        <Progress value={value} />
        <div className="mt-2 text-sm">{value}%</div>
      </div>
    );
  },
};
