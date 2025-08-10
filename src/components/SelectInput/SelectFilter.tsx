import { isEqual, orderBy } from "lodash";
import queryString from "query-string";
import { memo, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ActionMeta } from "react-select";

import SelectInput, { SelectOptionTypes } from "@/components/SelectInput";
import { QUERY_DEFAULT } from "@/constants/table";
import { useAuthStore } from "@/domains/auth/store/authStore";
import useFilter, {
  FILER_NAME_ENUM,
  FILTER_MODULES_ENUM,
  parseFilterOptionByKey,
  parseQueryValueSelectWithCustomItem,
} from "@/hooks/useFilter";

interface SelectFilterProps {
  name: FILER_NAME_ENUM;
  module: string;
  isMulti?: boolean;
  placeHolder?: string;
  className?: string;
  isCustomItem?: boolean;
  isClearable?: boolean;
}
interface SelectFilterInputProps {
  name: FILER_NAME_ENUM;
  options: SelectOptionTypes[];
  placeHolder?: string;
  defaultValueOption?: SelectOptionTypes | SelectOptionTypes[] | null;
  isClearable?: boolean;
  isLoading?: boolean;
  submitAfterBlur?: boolean;
  isMulti?: boolean;
  className?: string;
  isDisabled?: boolean;
  module?: string;
}
const SelectFilterInput = memo(
  ({
    name,
    options,
    placeHolder,
    isMulti = true,
    className = "min-w-[200px] max-w-[320px]",
    isDisabled,
    isLoading,
    module,
    isClearable,
  }: SelectFilterInputProps) => {
    const [selectedValue, setSelectedValue] = useState<SelectOptionTypes[]>([]);

    const authStore = useAuthStore();
    const { currentUser } = authStore;

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = queryString.parse(location.search);
    const currentSelectedFromParams: SelectOptionTypes[] = useMemo(() => {
      const newQueryParams = queryString.parse(location.search);
      if (newQueryParams[name]) {
        return parseQueryValueSelectWithCustomItem(
          options,
          newQueryParams?.[name] as string,
        ) as SelectOptionTypes[];
      }
      return [];
    }, [location.search, name, options]);

    useEffect(() => {
      if (options.length) {
        const newQueryParams = queryString.parse(location.search);
        if (newQueryParams[name]) {
          const valueParsed = parseQueryValueSelectWithCustomItem(
            options,
            newQueryParams?.[name] as string,
          ) as SelectOptionTypes[];
          if (valueParsed.length > 0) {
            setSelectedValue(valueParsed);
          } else {
            // check if module is ELN_PRICING_BATCHES or FCN_PRICING_BATCHES and name is REQUESTOR_ID and requestor id is not in options
            if (
              module === FILTER_MODULES_ENUM.ELN_PRICING_BATCHES ||
              module === FILTER_MODULES_ENUM.FCN_PRICING_BATCHES
            ) {
              if (name === FILER_NAME_ENUM.REQUESTOR_ID) {
                if (options.find((i) => i.value === currentUser?.userId)) {
                  setSelectedValue([
                    options.find((i) => i.value === currentUser?.userId) as SelectOptionTypes,
                  ]);
                }
              }
            }
          }
        } else {
          setSelectedValue([]);
        }
      }
    }, [name, options, location.search, currentUser?.userId, module]);

    const handleBlur = () => {
      if (!isMulti) {
        return;
      }
      if (selectedValue.length === 0) {
        delete queryParams[name];
        navigate({
          pathname: location.pathname,
          search: queryString.stringify({
            ...queryParams,
            pageIndex: QUERY_DEFAULT.pageIndex,
          }),
        });
        return;
      }
      const selectedValueSortByAlphabet = selectedValue.map((i) => i.value).sort();
      const currentSelectedFromParamsSortByAlphabet = currentSelectedFromParams
        .map((i) => i.value)
        .sort();
      if (isEqual(selectedValueSortByAlphabet, currentSelectedFromParamsSortByAlphabet)) {
        return;
      } else
        setTimeout(() => {
          navigate({
            pathname: location.pathname,
            search: queryString.stringify({
              ...queryParams,
              pageIndex: QUERY_DEFAULT.pageIndex,
              [name]: selectedValue.map(({ value }) => value).join(","),
            }),
          });
        }, 200);
    };

    const handleFilterSingle = (
      value: SelectOptionTypes,
      active?: ActionMeta<SelectOptionTypes | unknown>,
    ) => {
      if (active?.action === "clear") {
        setSelectedValue([]);
        delete queryParams[name];

        if (
          module === FILTER_MODULES_ENUM.ELN_PRICING_BATCHES ||
          module === FILTER_MODULES_ENUM.FCN_PRICING_BATCHES
        ) {
          if (name === FILER_NAME_ENUM.REQUESTOR_ID) {
            const currentRequestIdObj = JSON.parse(localStorage.getItem("requestorId") || "{}") as {
              [key: string]: string;
            };
            const requestorIdOf =
              module === FILTER_MODULES_ENUM.ELN_PRICING_BATCHES ? "ELN" : "FCN";
            delete currentRequestIdObj[requestorIdOf as string];
            const newRequesterIdObj = { ...currentRequestIdObj };
            localStorage.setItem("requestorId", JSON.stringify(newRequesterIdObj));
            window.dispatchEvent(new Event("storage"));
            navigate({
              pathname: location.pathname,
              search: queryString.stringify({
                ...queryParams,
                pageIndex: QUERY_DEFAULT.pageIndex,
                [name]: "",
              }),
            });
          }
        }
        navigate({
          pathname: location.pathname,
          search: queryString.stringify({
            ...queryParams,
            pageIndex: QUERY_DEFAULT.pageIndex,
            [name]: "",
          }),
        });

        return;
      } else {
        setSelectedValue([value]);
        if (
          module === FILTER_MODULES_ENUM.ELN_PRICING_BATCHES ||
          module === FILTER_MODULES_ENUM.FCN_PRICING_BATCHES
        ) {
          if (name === FILER_NAME_ENUM.REQUESTOR_ID) {
            const currentRequestIdObj = JSON.parse(localStorage.getItem("requestorId") || "{}") as {
              [key: string]: string;
            };
            const requestorIdOf =
              module === FILTER_MODULES_ENUM.ELN_PRICING_BATCHES ? "ELN" : "FCN";
            const newRequesterIdObj = {
              ...currentRequestIdObj,
              [requestorIdOf as string]: value.value,
            };
            localStorage.setItem("requestorId", JSON.stringify(newRequesterIdObj));
            window.dispatchEvent(new Event("storage"));
          }
        }
        setTimeout(() => {
          navigate({
            pathname: location.pathname,
            search: queryString.stringify({
              ...queryParams,
              pageIndex: QUERY_DEFAULT.pageIndex,
              [name]: value.value,
            }),
          });
        }, 200);
      }
    };
    return (
      <SelectInput
        isDisabled={isDisabled}
        name={name}
        placeholder={placeHolder}
        isLoading={isLoading}
        options={options}
        optionType={isMulti ? "checkbox" : "tick"}
        value={selectedValue}
        size="small"
        onBlur={() => handleBlur()}
        onChange={(value: unknown, action: ActionMeta<SelectOptionTypes | unknown>) => {
          if (isMulti) {
            if (action?.action === "clear") {
              setSelectedValue([]);
              delete queryParams[name];
              navigate({
                pathname: location.pathname,
                search: queryString.stringify({
                  ...queryParams,
                }),
              });
              return;
            }
            const valueParsed = value as SelectOptionTypes[];
            setSelectedValue(valueParsed);
          } else {
            handleFilterSingle(value as SelectOptionTypes, action);
          }
        }}
        isMulti={isMulti}
        isClearable={isClearable}
        showValueSelected={isMulti}
        closeMenuOnSelect={!isMulti}
        className={className}
      />
    );
  },
);
SelectFilterInput.displayName = "SelectFilterInput";
const MAPPING_KEY = {
  [FILER_NAME_ENUM.REQUESTOR_ID]: "users",
};
const SelectFilter = ({
  name,
  module,
  isMulti = false,
  placeHolder,
  className,
  isClearable,
}: SelectFilterProps) => {
  const { useFilterOptions } = useFilter();
  const { data, isFetching } = useFilterOptions(module);

  const filterOptions: SelectOptionTypes[] = useMemo(() => {
    if (!data || Array.isArray(data)) return [];
    const key = MAPPING_KEY[name];
    const result = (data as Record<string, SelectOptionTypes[]>)[key] || [];
    const parseOptions =
      (result?.map((i) =>
        parseFilterOptionByKey(module, key, i as SelectOptionTypes),
      ) as SelectOptionTypes[]) ?? [];
    return orderBy(parseOptions, ["label"], ["asc"]);
  }, [data, name, module]);

  return (
    <SelectFilterInput
      className={className}
      name={name}
      options={filterOptions}
      isMulti={isMulti}
      placeHolder={placeHolder}
      isDisabled={isFetching}
      isLoading={isFetching}
      module={module}
      isClearable={isClearable}
    />
  );
};

export default memo(SelectFilter);
