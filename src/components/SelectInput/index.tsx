import React, { useMemo } from "react";
import Select, {
  ActionMeta,
  OnChangeValue,
  type GroupBase,
  type Props as SelectProps,
} from "react-select";
import CreatableSelect from "react-select/creatable";

import * as CustomComponents from "./customComponents";

import { cn } from "@/lib/utils";

export interface SelectOptionTypes {
  value: string;
  label: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  unique?: string;
}

export type SelectComponentCustomProps = {
  createAble?: boolean;
  asyncMultiCreateAble?: boolean;
  error?: boolean;
  readOnly?: boolean;
  hasDescription?: boolean;
  hasCheckAll?: boolean;
  isSelectAll?: boolean;
  onSelectAll?: (isChecked: boolean) => void;
  optionType?: "tick" | "checkbox";
  size?: "small" | "medium";
  showValueSelected?: boolean;
  extendOnchange?: (
    e: SelectOptionTypes | SelectOptionTypes[],
    action?: ActionMeta<SelectOptionTypes | unknown>,
  ) => void;
  dataTestId?: string;
  checkMenuPlacement?: boolean;
  menuClassName?: string;
};

export type OptionType = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  [key: string]: unknown;
};

const SelectComponent = React.forwardRef(SelectComponentInner) as <
  Option = OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group> &
    SelectComponentCustomProps & {
      ref?: React.ForwardedRef<
        React.ElementRef<typeof Select<Option, IsMulti, Group>>
      >;
    },
) => ReturnType<typeof SelectComponentInner>;

export default SelectComponent;

function SelectComponentInner<
  Option = OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  {
    value,
    isDisabled,
    createAble = false,
    isLoading,
    readOnly,
    hasDescription,
    openMenuOnFocus = true,
    optionType = "tick",
    size = "medium",
    showValueSelected,
    extendOnchange,
    maxMenuHeight,
    menuClassName,
    ...props
  }: SelectProps<Option, IsMulti, Group> & SelectComponentCustomProps,
  ref: React.ForwardedRef<
    React.ElementRef<typeof Select<Option, IsMulti, Group>>
  >,
) {
  const Comp = createAble ? CreatableSelect : Select;

  const CustomOption = useMemo(() => {
    switch (optionType) {
      case "tick":
        return CustomComponents.OptionWithTick;
      case "checkbox":
        return CustomComponents.OptionWithCheckbox;
      default:
        return CustomComponents.OptionWithTick;
    }
  }, [optionType]);

  return (
    <Comp
      ref={ref}
      unstyled
      isLoading={isLoading}
      instanceId={props.id}
      isSearchable={!readOnly}
      filterOption={(option, rawInput) => {
        const label = String(option.label ?? "").toLowerCase();
        const input = String(rawInput ?? "").toLowerCase();
        return label.includes(input);
      }}
      closeMenuOnScroll
      hideSelectedOptions={false}
      maxMenuHeight={maxMenuHeight}
      menuShouldScrollIntoView
      value={value}
      isDisabled={isDisabled || readOnly}
      components={{
        DropdownIndicator: CustomComponents.DropdownIndicator,
        ClearIndicator: CustomComponents.ClearIndicator,
        IndicatorSeparator: () => null,
        LoadingIndicator: () => null,
        MultiValueRemove: isDisabled
          ? () => null
          : CustomComponents.MultiValueRemove,
        SingleValue: CustomComponents.SingleValue,
        MultiValue: CustomComponents.MultiValue,
        ...(showValueSelected && {
          ValueContainer: CustomComponents.ValueContainerCustom,
        }),
        Option: CustomOption,
      }}
      openMenuOnClick={(!readOnly && !isLoading) || openMenuOnFocus}
      defaultValue={value}
      classNames={{
        container: () => CustomComponents.containerStyles,
        control: ({ isFocused, isDisabled, isMulti }) =>
          cn(CustomComponents.controlStyles.base, {
            [CustomComponents.controlStyles.disabled]: isDisabled,
            [CustomComponents.controlStyles.focus]: isFocused,
            [CustomComponents.controlStyles.nonFocus]: !isFocused,
            [CustomComponents.controlStyles.error]: !!props.error,
            [CustomComponents.controlStyles.multi]: isMulti,
            [CustomComponents.controlStyles.singleSmall]:
              !isMulti && size === "small",
            [CustomComponents.controlStyles.multiSmall]:
              isMulti && size === "small",
          }),
        option: ({ isDisabled, isSelected }) =>
          cn(CustomComponents.optionsStyle.base, {
            [CustomComponents.optionsStyle.disabled]: isDisabled,
            [CustomComponents.optionsStyle.isSelected]: isSelected,
            "!px-2 w-fit !min-h-11 text-xs break-words": size === "small",
          }),
        placeholder: () => CustomComponents.placeholderStyles,
        input: () => CustomComponents.selectInputStyles,
        menu: () =>
          cn(
            CustomComponents.menuStyles,
            { "mt-5": hasDescription },
            menuClassName,
          ),
        valueContainer: () =>
          cn(CustomComponents.valueContainerStyles, {
            // '!px-1': size === 'small',
          }),
        singleValue: () => CustomComponents.singleValueStyles,
        multiValue: () =>
          isDisabled
            ? CustomComponents.multiValueNoRemoveStyles
            : CustomComponents.multiValueStyles,
        multiValueLabel: () => CustomComponents.multiValueLabelStyles,
        multiValueRemove: () => CustomComponents.multiValueRemoveStyles,
        indicatorsContainer: () => CustomComponents.indicatorsContainerStyles,
        clearIndicator: () => CustomComponents.clearIndicatorStyles,
        indicatorSeparator: () => CustomComponents.indicatorSeparatorStyles,
        dropdownIndicator: () => CustomComponents.dropdownIndicatorStyles,
        groupHeading: () => CustomComponents.groupHeadingStyles,
        noOptionsMessage: () => CustomComponents.noOptionsMessageStyles,
        loadingIndicator: () => CustomComponents.loadingIndicatorStyles,
      }}
      {...props}
      onChange={(
        item: OnChangeValue<Option, IsMulti>,
        action: ActionMeta<Option>,
      ) => {
        props.onChange?.(item, action);
        extendOnchange?.(
          item as SelectOptionTypes | SelectOptionTypes[],
          action,
        );
      }}
    />
  );
}
