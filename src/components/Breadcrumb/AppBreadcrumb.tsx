import { Fragment } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/Breadcrumb";
import { cn } from "@/lib/utils";

interface AppBreadcrumbProps {
  data: {
    title: React.ReactNode;
    href: string;
  }[];
  className?: string;
}

export const AppBreadcrumb = ({ data, className }: AppBreadcrumbProps) => {
  return (
    <div className={cn(className)}>
      <Breadcrumb>
        <BreadcrumbList>
          {data.map((item, index) => (
            <Fragment key={index}>
              <BreadcrumbItem key={index}>
                {index === data.length - 1 ? (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <NavLink to={item.href}>{item.title}</NavLink>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < data.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
