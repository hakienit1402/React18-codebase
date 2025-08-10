import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { LucideProps } from "lucide-react";
import { SVGProps } from "react";

import { APIError } from "@/services/apis";

export type IconProps = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & Partial<SVGProps<SVGSVGElement>>
>;

export interface PaginationProps {
  pageIndex?: string;
  pagePreIndex?: string;
  pageSize?: string;
  skip?: string;
  startOffset?: string;
  endOffset?: string;
}

export interface QueryParamsProps extends PaginationProps {
  search?: string;
}

export interface SortProps {
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface BasicFilterProps {
  currentPage?: string;
  pageSize?: string;
  search?: string;
  status?: string | string[];
}

export interface AdditionalFilterProps {
  requestorId?: string;
}

export type QueriesFilterProps = PaginationProps &
  BasicFilterProps &
  SortProps &
  AdditionalFilterProps;

export type QueryOptionProps<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export type MutationOptionProps<TData, TError = APIError, TVariables = void> = Omit<
  UseMutationOptions<TData, TError, TVariables>,
  "mutationKey" | "mutationFn"
>;
