import { NavLink, useLocation } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { cn } from "@/lib/utils";

export interface TabsPageDataProps {
  pathname: string;
  content: string | React.ReactNode;
  value: string;
  permission?: boolean;
}

interface TabsPageProps {
  data: TabsPageDataProps[];
  children: React.ReactNode;
  noPadding?: boolean;
  convertPathname?: (pathname: string) => string;
  wrapperClassName?: string;
  tabListClassName?: string;
  tabItemClassName?: string;
  footerAction?: JSX.Element;
}

const TabsPage = ({
  data,
  children,
  noPadding = false,
  convertPathname = (s) => s,
  tabItemClassName,
  tabListClassName,
  wrapperClassName,
  footerAction,
}: TabsPageProps) => {
  const location = useLocation();

  return (
    <Tabs
      className={cn(
        "flex w-full flex-1 flex-col rounded-sm shadow-content",
        wrapperClassName,
      )}
      value={location.pathname}
    >
      <div className="flex items-center justify-between gap-6">
        <TabsList
          className={cn(
            {
              "px-0": noPadding,
              "px-4": !noPadding,
            },
            "hide-scrollbar z-30 w-full justify-start gap-4 overflow-x-auto rounded-none border-b border-neutral-dark-300",
            tabListClassName,
          )}
        >
          {data.map((tab) => (
            <TabsTrigger
              asChild
              key={tab.pathname}
              className="p-2"
              value={convertPathname(tab.pathname) || tab.pathname}
            >
              <NavLink
                to={tab.value}
                className={cn(
                  "rounded-none border-b-2 border-b-transparent px-0 text-neutral-dark-600 data-[state=active]:border-b-primary-500 data-[state=active]:font-semibold data-[state=active]:text-white [&.active]:border-b-primary-500 [&.active]:font-semibold [&.active]:text-white",
                  tabItemClassName,
                )}
                state={{
                  from: location.state?.from,
                  search: location.state?.search,
                }}
              >
                {tab.content}
              </NavLink>
            </TabsTrigger>
          ))}
        </TabsList>
        {!!footerAction && (
          <div className="flex items-center pl-6">{footerAction}</div>
        )}
      </div>
      <TabsContent value={location.pathname} className="contents">
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default TabsPage;
