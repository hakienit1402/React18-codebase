import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, waitFor, expect } from "@storybook/test";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import AsyncCreateableSelectField from "./AsyncSelectField";
import BooleanCheckboxGroupField from "./BooleanCheckboxGroupField";
import CheckboxGroupField from "./CheckboxGroupField";
import NumberField from "./NumberField";
import SegmentedField from "./SegmentedField";
import SelectField from "./SelectField";
import TextareaField from "./TextareaField";
import TextField from "./TextField";

import { Button } from "@/components/Button";
import type { OptionType as SelectOption } from "@/components/SelectInput";
import type { SelectOptionTypes } from "@/components/SelectInput";
import type { OptionType as AsyncSelectOption } from "@/components/SelectInput/AsyncCreateableSelectInput";

// Schema
const optionSchema = z.object({ label: z.string(), value: z.string() });
const selectableSchema = optionSchema.extend({ unique: z.string().optional() });

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  description: z.string().max(200, "Max 200 characters").optional(),
  amount: z.string().refine((v) => v !== "" && !Number.isNaN(Number(v)) && Number(v) > 0, {
    message: "Amount must be a positive number",
  }),
  country: optionSchema,
  tag: optionSchema.optional().nullable(),
  fruits: z.array(selectableSchema).min(1, "Select at least 1 fruit"),
  toggles: z
    .record(z.boolean())
    .refine((obj) => Object.values(obj).some(Boolean), "Enable at least one toggle"),
  view: z.enum(["list", "grid", "compact"]),
});

type FormValues = z.infer<typeof formSchema>;

const meta: Meta = {
  title: "Form/AllFieldsDemo",
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj;

export const FullForm: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState<FormValues | null>(null);
    const methods = useForm<FormValues>({
      mode: "onChange",
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
        description: "",
        amount: "",
        country: { label: "Vietnam", value: "VN" },
        tag: null,
        fruits: [],
        toggles: {},
        view: "list",
      },
    });

    const options: SelectOption[] = useMemo(
      () => [
        { label: "Vietnam", value: "VN" },
        { label: "Singapore", value: "SG" },
        { label: "United States", value: "US" },
      ],
      [],
    );

    const fruitOptions: SelectOptionTypes[] = useMemo(
      () => [
        { label: "Apple", value: "apple", unique: "1" },
        { label: "Banana", value: "banana", unique: "2" },
        { label: "Cherry", value: "cherry", unique: "3" },
      ],
      [],
    );

    const booleanOptions = useMemo(
      () => [
        { key: "a", label: "Enable A" },
        { key: "b", label: "Enable B" },
        { key: "c", label: "Enable C", description: "Optional" },
      ],
      [],
    );

    const loadOptions =
      () => (inputValue: string, callback: (opts: AsyncSelectOption[]) => void) => {
        const all: AsyncSelectOption[] = [
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
          { label: "Svelte", value: "svelte" },
        ];
        const filtered = all.filter((o) =>
          o.label.toLowerCase().includes(inputValue.toLowerCase()),
        );
        setTimeout(() => callback(filtered), 300);
      };

    const onSubmit = (data: FormValues) => setSubmitted(data);

    return (
      <FormProvider {...methods}>
        <form
          className="w-[720px] max-w-[90vw] space-y-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField<FormValues, "username">
              name="username"
              label="Username"
              placeholder="Enter username"
              hasAsterisk
            />

            <TextField<FormValues, "password">
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              hasAsterisk
            />

            <NumberField<FormValues, "amount">
              name="amount"
              label="Amount"
              thousandSeparator
              decimalScale={2}
              placeholder="0.00"
              hasAsterisk
            />

            <SelectField<FormValues, "country">
              name="country"
              label="Country"
              options={options}
              isClearable
              placeholder="Select country"
              hasAsterisk
            />
          </div>

          <AsyncCreateableSelectField<FormValues, "tag">
            name="tag"
            label="Tags (async createable)"
            placeholder="Type to search or create..."
            isClearable
            loadOptions={loadOptions as any}
          />

          <TextareaField<FormValues, "description">
            name="description"
            label="Description"
            placeholder="Write something..."
          />

          <CheckboxGroupField<FormValues, "fruits">
            name="fruits"
            label="Favorite fruits"
            options={fruitOptions}
          />

          <BooleanCheckboxGroupField<FormValues, "toggles">
            name="toggles"
            label="Feature toggles"
            options={booleanOptions}
          />

          <SegmentedField<FormValues, "view">
            name="view"
            label="View mode"
            options={[
              { label: "List", value: "list" },
              { label: "Grid", value: "grid" },
              { label: "Compact", value: "compact" },
            ]}
          />

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit">Submit</Button>
            <Button
              type="button"
              variant="secondary"
              asChild={false}
              onClick={() => methods.reset()}
            >
              Reset
            </Button>
          </div>

          {submitted && (
            <pre className="mt-4 max-h-64 overflow-auto rounded bg-neutral-dark-200 p-3 text-xs">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          )}
        </form>
      </FormProvider>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Username
    const usernameInput = canvas.getByLabelText("Username");
    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, "john_doe");

    // Password
    const passwordInput = canvas.getByLabelText("Password");
    await userEvent.type(passwordInput, "secretpw");

    // Amount
    const amountInput = canvas.getByLabelText("Amount");
    await userEvent.type(amountInput, "12345");

    // Country (react-select)
    const countryPlaceholder = canvas.getByText("Select country");
    await userEvent.click(countryPlaceholder);
    const countryCombobox = canvas.getByRole("combobox");
    await userEvent.type(countryCombobox, "Singapore");
    await userEvent.keyboard("{Enter}");

    // Tags (async creatable)
    const tagPlaceholder = canvas.getByText("Type to search or create...");
    await userEvent.click(tagPlaceholder);
    const tagCombobox = canvas.getByRole("combobox");
    await userEvent.type(tagCombobox, "React");
    await userEvent.keyboard("{Enter}");

    // Fruits (checkbox group)
    const appleCheckbox = canvas.getByLabelText("Apple");
    await userEvent.click(appleCheckbox);

    // Toggles (boolean checkbox group)
    const toggleA = canvas.getByLabelText("Enable A");
    await userEvent.click(toggleA);

    // View (segmented)
    const gridSegment = canvas.getByText("Grid");
    await userEvent.click(gridSegment);

    // Submit
    const submitBtn = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(canvas.getByText(/"username":\s*"john_doe"/)).toBeTruthy();
    });
  },
};
