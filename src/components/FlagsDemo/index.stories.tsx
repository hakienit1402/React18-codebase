import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FlagGate, FeatureFlagProvider } from "@/features/flags/FeatureFlagProvider";

const meta = {
  title: "Components/Utility/Feature Flags",
} satisfies Meta;

export default meta;

export const GateDemo: StoryObj = {
  render: () => (
    <FeatureFlagProvider flags={{ FF_NEW_UI: true }}>
      <div>
        <p>Always visible</p>
        <FlagGate name="FF_NEW_UI">
          <p>Shown when FF_NEW_UI is enabled</p>
        </FlagGate>
      </div>
    </FeatureFlagProvider>
  ),
};


