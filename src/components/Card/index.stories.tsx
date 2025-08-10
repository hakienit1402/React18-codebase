import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from ".";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Short description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content here</p>
      </CardContent>
      <CardFooter>
        <button className="rounded border px-3 py-2">Action</button>
      </CardFooter>
    </Card>
  ),
};
