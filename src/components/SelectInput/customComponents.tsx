import {
  Check,
  ChevronDown,
  Loader2Icon,
  LockIcon,
  Square,
  X,
} from "lucide-react";
import { useMemo } from "react";
import {
  components,
  MultiValueProps,
  OptionProps,
  SingleValueProps,
  ValueContainerProps,
  type ClearIndicatorProps,
  type DropdownIndicatorProps,
  type GroupBase,
  type MultiValueRemoveProps,
} from "react-select";

import { OptionType } from ".";

import { cn } from "@/lib/utils";

export const controlStyles = {
  base: "!h-11 w-full shrink-0 overflow-hidden rounded-lg border hover:border-neutral-light-300 shadow-sm transition-color px-3",
  focus: "border-neutral-light-300",
  nonFocus: "border-common-outline",
  disabled:
    "!cursor-not-allowed !pointer-events-auto bg-neutral-dark-200 hover:border-common-outline",
  error:
    "border-semantics-red-500 hover:border-semantics-red-500 focus:border-semantics-red-500 focus-visible:border-semantics-red-500 disabled:hover:border-semantics-red-500",
  multi: "!h-auto !min-h-11",
  singleSmall: "!h-8 !min-h-8 !px-1",
  multiSmall: "!min-h-8",
};
export const containerStyles = "w-full";
export const placeholderStyles = "ml-1 text-neutral-light-800";
export const selectInputStyles = "ml-1 text-neutral-light-300 cursor-text ";
export const valueContainerStyles =
  "text-neutral-light-300 text-sm gap-1 flex items-center flex-wrap py-1";
export const singleValueStyles = "ml-1 [&>svg]:shrink-0";
export const multiValueStyles =
  "bg-neutral-dark-400 rounded  items-center p-1 pl-2 pr-1 gap-1.5";
export const multiValueNoRemoveStyles =
  "bg-neutral-dark-400 rounded items-center p-1 pr-2 gap-1.5";
export const multiValueLabelStyles = "leading-5 text-xs";
export const multiValueRemoveStyles =
  "bg-transparent text-neutral-light-500 hover:text-semantics-red-500 rounded-md w-4 h-4";
export const indicatorsContainerStyles = "gap-1";
export const clearIndicatorStyles =
  "bg-transparent text-neutral-light-500 rounded-md cursor-pointer  hover:text-semantics-red-500";
export const indicatorSeparatorStyles = "bg-transparent";
export const dropdownIndicatorStyles =
  "hover:text-neutral-light-400 text-neutral-light-500";
export const loadingIndicatorStyles = "text-neutral-light-300 bg-background";

export const menuStyles =
  "my-1.5 border border-common-outline bg-common-surface text-sm rounded-lg overflow-hidden min-h-11 !z-20";
export const optionsStyle = {
  base: "min-h-12 h-auto py-3 px-4 border-0 text-base hover:bg-common-surfaceOverlay hover:cursor-pointer text-neutral-light-300 text-sm [&:not(:last-child)]:border-b border-common-outline [&:last-child]:border-b-0",
  disabled:
    "!cursor-not-allowed bg-neutral-dark-200 hover:bg-neutral-dark-200 text-neutral-light-800",
  isSelected: "bg-common-surfaceOverlay",
};
export const groupHeadingStyles =
  "ml-3 mt-2 mb-1 text-neutral-light-500 text-sm ";
export const noOptionsMessageStyles =
  "min-h-20 flex items-center p-3 justify-center text-neutral-light-800";

export const DropdownIndicator = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>,
) => {
  const icon = useMemo(() => {
    switch (true) {
      case props.selectProps.isLoading:
        return <Loader2Icon className="animate-spin" />;
      case props.isDisabled:
        return <LockIcon className={cn("text-neutral-light-500")} />;
      default:
        return <ChevronDown />;
    }
  }, [props.isDisabled, props.selectProps.isLoading]);

  return (
    <components.DropdownIndicator {...props}>
      {icon}
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>,
) => (
  <components.ClearIndicator {...props}>
    <X />
  </components.ClearIndicator>
);

export const SingleValue = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  className,
  ...props
}: SingleValueProps<Option, IsMulti, Group>) => {
  return (
    <components.SingleValue
      {...props}
      className={cn(
        props.getStyles("singleValue", props),
        className,
        "flex items-center gap-2",
      )}
    >
      {(props?.data as OptionType)?.icon &&
        (typeof (props?.data as OptionType)?.icon === "string" ? (
          <span className="h-4 w-4 shrink-0">
            <img
              src={(props?.data as OptionType)?.icon as string}
              alt="icon"
              className={cn("h-full w-full object-cover", {})}
            />
          </span>
        ) : (
          (props?.data as OptionType)?.icon
        ))}
      <p>{props.children}</p>
    </components.SingleValue>
  );
};

export const MultiValue = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  className,
  ...props
}: MultiValueProps<Option, IsMulti, Group>) => {
  return (
    <components.MultiValue
      {...props}
      className={cn(
        props.getStyles("multiValue", props),
        className,
        "flex h-[28px] w-fit items-center gap-1",
      )}
    >
      <span className="mt-[2px] scale-75">
        {(props?.data as OptionType)?.icon &&
          (typeof (props?.data as OptionType)?.icon === "string" ? (
            <span className="h-4 w-4 shrink-0">
              <img
                src={(props?.data as OptionType)?.icon as string}
                alt="icon"
                className={cn("h-full w-full object-cover", {})}
              />
            </span>
          ) : (
            (props?.data as OptionType)?.icon
          ))}
      </span>
      <p>{props.children}</p>
    </components.MultiValue>
  );
};

export const MultiValueRemove = (props: MultiValueRemoveProps) => (
  <components.MultiValueRemove {...props}>
    <X />
  </components.MultiValueRemove>
);

const SOME_THRESHOLD = 20;
export const OptionWithTick = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  className,
  ...props
}: OptionProps<Option, IsMulti, Group>) => {
  const firstWord = (props.children as string).split(" ")[0];
  const shouldBreakAll = firstWord.length > SOME_THRESHOLD;

  return (
    <components.Option
      {...props}
      className={cn(
        props.getStyles("option", props),
        className,
        optionsStyle.base,
        {
          [optionsStyle.disabled]: props.isDisabled,
          [optionsStyle.isSelected]: props.isSelected,
        },
        "!flex items-center justify-between space-x-2",
      )}
    >
      <div className="flex w-[calc(100%-40px)] items-center space-x-2">
        {(props?.data as OptionType)?.icon &&
          (typeof (props?.data as OptionType)?.icon === "string" ? (
            <span className="h-4 w-4 shrink-0">
              <img
                src={(props?.data as OptionType)?.icon as string}
                alt="icon"
                className={cn("h-full w-full object-cover", {})}
              />
            </span>
          ) : (
            (props?.data as OptionType)?.icon
          ))}
        <p
          className={cn("break-words", {
            "!break-all": shouldBreakAll,
          })}
        >
          {props.children}
        </p>
      </div>
      {props.isSelected && <Check className="h-5 w-5 text-primary-500" />}
    </components.Option>
  );
};

export const OptionWithCheckbox = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  className,
  ...props
}: OptionProps<Option, IsMulti, Group>) => {
  return (
    <components.Option
      {...props}
      className={cn(
        props.getStyles("option", props),
        optionsStyle.base,
        {
          [optionsStyle.disabled]: props.isDisabled,
          [optionsStyle.isSelected]: props.isSelected,
        },
        "!flex items-center space-x-2",
        className,
      )}
    >
      <label className="relative inline-flex h-4 w-4 items-center justify-center">
        <input
          type="checkbox"
          disabled={props.isDisabled}
          checked={props.isSelected}
          onChange={() => null}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={cn(
            "pointer-events-none inline-flex h-4 w-4 items-center justify-center rounded-sm border text-neutral-dark-100",
            props.isSelected
              ? "border-primary-500 bg-primary-500"
              : "border-[1.75px] border-[#7E7892]",
            props.isDisabled && "opacity-50",
          )}
        >
          {props.isSelected ? (
            <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
          ) : (
            <Square strokeWidth={2.5} />
          )}
        </span>
      </label>
      <div className="flex items-center space-x-2">
        {(props?.data as OptionType)?.icon &&
          (typeof (props?.data as OptionType)?.icon === "string" ? (
            <span className="h-4 w-4 shrink-0">
              <img
                src={(props?.data as OptionType)?.icon as string}
                alt="icon"
                className={cn("h-full w-full object-contain", {})}
              />
            </span>
          ) : (
            (props?.data as OptionType)?.icon
          ))}
        <p>{props.children}</p>
      </div>
    </components.Option>
  );
};

export const ValueContainerCustom = <
  Option = OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  className,
  ...props
}: ValueContainerProps<Option, IsMulti, Group>) => {
  const { children, isDisabled, getValue } = props;
  let newChildren: React.ReactNode = children;
  if (Array.isArray(children)) {
    const [firstChild, lastChild] = children;
    if (Array.isArray(firstChild)) {
      const NewMultiContent = (
        <p
          key={getValue().length}
          className={cn("text-slate-110 flex items-center", {
            "text-slate-70": isDisabled,
          })}
        >
          <span
            className={cn(
              "after:bg-slate-110 flex items-center after:mx-1 after:block after:h-1 after:w-1 after:rounded-full after:content-['']",
              {
                "text-slate-70 after:bg-slate-20": isDisabled,
              },
            )}
          >
            {getValue().length > 0
              ? `Selected • ${getValue().length} `
              : "Select"}
          </span>
        </p>
      );

      newChildren = [NewMultiContent, lastChild];
    }
  }

  return (
    <components.ValueContainer {...props} className={className}>
      {newChildren}
    </components.ValueContainer>
  );
};
