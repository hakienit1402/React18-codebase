import React, { useEffect, useMemo, useRef, useState } from "react";
import Select, {
  ActionMeta,
  OnChangeValue,
  type GroupBase,
  type Props as SelectProps,
} from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";

import * as CustomComponents from "@/components/SelectInput/customComponentAsync";
import { cn } from "@/lib/utils";

export interface SelectOptionTypes {
  value: string;
  label: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
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
  minInputLength?: number;
  maxInputLength?: number;
  isUnderlyingSelect?: boolean;
};

export type OptionType = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  tooltip?: string;
  __isNew__?: boolean;
  [key: string]: unknown;
};

const AsyncCreateAbleSelectInput = React.forwardRef(
  AsyncCreateAbleSelectComponentInner,
) as <
  Option = OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: (SelectProps<Option, IsMulti, Group> & {
    loadOptions: (
      lastOptionsRef: React.MutableRefObject<OptionType[]>,
    ) => (inputValue: string, callback: (options: Option[]) => void) => void;
  }) &
    SelectComponentCustomProps & {
      ref?: React.ForwardedRef<
        React.ElementRef<typeof Select<Option, IsMulti, Group>>
      >;
    },
) => ReturnType<typeof AsyncCreateAbleSelectComponentInner>;

export default AsyncCreateAbleSelectInput;

function AsyncCreateAbleSelectComponentInner<
  Option = OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  {
    isDisabled,
    isLoading,
    hasDescription,
    optionType = "tick",
    size = "medium",
    showValueSelected,
    extendOnchange,
    loadOptions,
    styles,
    minInputLength = 2,
    maxInputLength = 20,
    // Note: isUnderlyingSelect is deprecated; MultiValueUnderlying is not bundled here.
    ...props
  }: (SelectProps<Option, IsMulti, Group> & {
    loadOptions: (
      lastOptionsRef: React.MutableRefObject<Option[]>,
    ) => (inputValue: string, callback: (options: Option[]) => void) => void;
  }) &
    SelectComponentCustomProps,
  ref: React.ForwardedRef<
    React.ElementRef<typeof Select<Option, IsMulti, Group>>
  >,
) {
  const [inputValue, setInputValue] = useState("");
  const [menuMaxHeight, setMenuMaxHeight] = useState<number | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const lastSearchRef = useRef<string>("");
  const lastOptionsRef = useRef<Option[]>([]);

  useEffect(() => {
    const calculateMenuHeight = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const bottomSpace = viewportHeight - rect.bottom;
        setMenuMaxHeight(bottomSpace - 10);
      }
    };

    calculateMenuHeight();
    window.addEventListener("resize", calculateMenuHeight);
    window.addEventListener("scroll", calculateMenuHeight);

    return () => {
      window.removeEventListener("resize", calculateMenuHeight);
      window.removeEventListener("scroll", calculateMenuHeight);
    };
  }, []);

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

  const isValidNewOption = (value: string) => {
    const sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
    const isWithinLength =
      sanitizedValue.length >= minInputLength &&
      sanitizedValue.length <= maxInputLength;
    return sanitizedValue === value && isWithinLength;
  };
  return (
    <div className="relative w-full" ref={selectRef}>
      <AsyncCreatableSelect
        {...props}
        loadOptions={loadOptions(lastOptionsRef)}
        ref={ref}
        unstyled
        defaultOptions={lastOptionsRef.current}
        isLoading={isLoading}
        inputValue={inputValue}
        menuPlacement="bottom"
        isValidNewOption={isValidNewOption}
        onInputChange={(newValue, { action }) => {
          if (action === "input-change") {
            setInputValue(newValue);
            lastSearchRef.current = newValue;
          }
        }}
        onBlur={(event) => {
          props.onBlur?.(event);
          setInputValue("");
          lastSearchRef.current = "";
          lastOptionsRef.current = [];
        }}
        components={{
          DropdownIndicator: null,
          ClearIndicator: CustomComponents.ClearIndicator,
          IndicatorSeparator: () => null,
          LoadingIndicator: () => null,
          MultiValueRemove: isDisabled
            ? () => null
            : CustomComponents.MultiValueRemove,
          SingleValue: CustomComponents.SingleValue,
          MultiValue: ({ ...props }) => (
            <CustomComponents.MultiValue {...props}>
              {(props.data as OptionType).value}
            </CustomComponents.MultiValue>
          ),
          ...(showValueSelected && {
            ValueContainer: CustomComponents.ValueContainerCustom,
          }),
          Option: CustomOption,
        }}
        classNames={{
          container: () => CustomComponents.containerStyles,
          control: ({ isFocused, isMulti }) =>
            cn(
              CustomComponents.controlStyles.base,
              {
                [CustomComponents.controlStyles.focus]: isFocused,
                [CustomComponents.controlStyles.nonFocus]: !isFocused,
                [CustomComponents.controlStyles.error]: !!props.error,

                [CustomComponents.controlStyles.multi]: isMulti,
                [CustomComponents.controlStyles.multiSmall]:
                  isMulti && size === "small",
              },
              "px-2 py-1",
            ),
          option: ({ isFocused }) =>
            cn(CustomComponents.optionsStyle.base, {
              "!px-2 w-fit !min-h-9 text-xs": size === "small",
              [CustomComponents.controlStyles.focusOption]: isFocused,
            }),
          placeholder: () => CustomComponents.placeholderStyles,
          input: () => CustomComponents.selectInputStyles,
          menu: () =>
            cn(CustomComponents.menuStyles, { "mt-5": hasDescription }),
          valueContainer: () => cn(CustomComponents.valueContainerStyles, {}),
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
          loadingMessage: () => "text-neutral-light-300 p-4 text-center",
        }}
        onChange={(
          item: OnChangeValue<Option, IsMulti>,
          action: ActionMeta<Option>,
        ) => {
          props.onChange?.(item, action);
          extendOnchange?.(
            item as SelectOptionTypes | SelectOptionTypes[],
            action,
          );
          setInputValue("");
        }}
        styles={{
          ...styles,
          menuList: (base) => ({
            ...base,
            maxHeight: menuMaxHeight ? `${menuMaxHeight}px` : "280px",
            overflowY: "auto",
          }),
        }}
      />
    </div>
  );
}
