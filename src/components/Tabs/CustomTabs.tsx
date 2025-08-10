import { NavLink, useLocation } from "react-router-dom";

import { TabsPageDataProps } from "@/components/Tabs/TabsPage";
import { cn } from "@/lib/utils";

interface CustomTabsProps {
  wrapperClassName?: string;
  data: TabsPageDataProps[];
  convertPathname?: (pathname: string) => string;
  tabItemClassName?: string;
  tabItemWrapperClassName?: string;
  tabListClassName?: string;
}
const CustomTabsPage = ({
  wrapperClassName,
  tabItemClassName,
  data,
  tabListClassName,
  tabItemWrapperClassName,
}: CustomTabsProps) => {
  const location = useLocation();

  return (
    <div
      className={cn("flex w-full flex-col shadow-content", wrapperClassName)}
    >
      <div
        className={cn(
          "hide-scrollbar flex w-full justify-start rounded-none border-b border-neutral-dark-300",
          tabListClassName,
        )}
      >
        {data.map((tab) => (
          <div
            key={tab.pathname}
            className={cn("py-2", tabItemWrapperClassName)}
          >
            <NavLink
              to={tab.value}
              className={cn(
                "text-nowrap rounded-none border-b-2 border-b-transparent p-2 text-sm text-neutral-dark-600 data-[state=active]:border-b-primary-500 data-[state=active]:font-semibold data-[state=active]:text-white [&.active]:border-b-primary-500 [&.active]:font-semibold [&.active]:text-neutral-light-200",
                tabItemClassName,
              )}
              state={{
                from: location.state?.from,
                search: location.state?.search,
              }}
            >
              {tab.content}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTabsPage;
