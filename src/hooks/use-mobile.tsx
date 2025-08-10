import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(breakpoint?: number) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );
  const breakpointWidth = breakpoint || MOBILE_BREAKPOINT;

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointWidth - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpointWidth);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < breakpointWidth);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpointWidth]);

  return !!isMobile;
}
