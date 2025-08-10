import { format, isValid, parse } from "date-fns";
import queryString from "query-string";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CalendarNoControl } from "@/components/Calendar/CalendarNoControl";

interface CalendarFilterProps {
  name: string;
  placeholder?: string;
  formatStr?: string; // format Calendar
  queryFormat?: string; // format query string
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function CalendarFilter({
  name,
  placeholder = "Select date",
  formatStr = "dd/MM/yyyy",
  queryFormat = "yyyy-MM-dd",
  className,
  size,
}: CalendarFilterProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const value: Date | null = useMemo(() => {
    const params = queryString.parse(location.search);
    if (params[name]) {
      const parsed = parse(params[name] as string, queryFormat, new Date());
      return isValid(parsed) ? parsed : null;
    }
    return null;
  }, [location.search, name, queryFormat]);

  const handleChange = (date: Date | null) => {
    const params = queryString.parse(location.search);
    if (date) {
      params[name] = format(date, queryFormat);
    } else {
      delete params[name];
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify({
        ...params,
        pageIndex: 1,
      }),
    });
  };

  return (
    <CalendarNoControl
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      formatStr={formatStr}
      inputClassName={className}
      size={size}
    />
  );
}
