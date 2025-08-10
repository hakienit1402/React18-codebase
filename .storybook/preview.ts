import type { Preview } from "@storybook/react";
import "./preview.css";
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "Intro",
          ["Getting Started", "Architecture"],
          "Form",
          "Components",
          [
            "Inputs",
            [
              "Input",
              "Textarea",
              "Checkbox",
              "Switch",
              "Slider",
              "RadioGroup",
              "Toggle",
              "ToggleGroup",
              "InputOTP",
            ],
            "Data Display",
            ["Avatar", "Badge", "Card", "Separator", "Skeleton", "Progress", "Label"],
            "Navigation",
            ["Tabs", "Breadcrumb", "Menubar", "NavigationMenu", "Pagination"],
            "Overlays",
            [
              "Tooltip",
              "Popover",
              "Dialog",
              "Drawer",
              "AlertDialog",
              "HoverCard",
              "Sheet",
              "ContextMenu",
            ],
            "Utility",
            ["ScrollArea", "Resizable", "Command", "Select"],
          ],
        ],
      },
    },
  },
};

export default preview;
