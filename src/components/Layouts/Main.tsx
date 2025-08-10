import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { EllipsisVertical, LogOutIcon } from "lucide-react";
import * as React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import logo from "@/assets/logo-icon.svg";
import pulsar from "@/assets/Pulsar.png";
import { Button } from "@/components/Button";
import StarBackground from "@/components/Motions/StarBackground";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import TooltipCustom from "@/components/Tooltip/TooltipCustom";
import { ROUTES_PATH } from "@/constants/router";
import { useAuthStore, UserStateEnum } from "@/domains/auth/store/authStore";
import {
  USER_ROLE_LABELS,
  UserRoleEnum,
} from "@/domains/user-management/constants/user";
import useNavigationItems from "@/hooks/useNavigationItems";
import { cn } from "@/lib/utils";
import { clearAuthToken } from "@/services/apis";
import { SideBarOptionsProps } from "@/types/sidebar.type";
import { getFirstNCharacters } from "@/utils/common";

const Sidebar = React.memo(() => {
  const [sidebarOpen] = React.useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const accessibleRoutes = useNavigationItems();

  React.useEffect(() => {
    if (accessibleRoutes.length > 0 && location.pathname === "/") {
      navigate(accessibleRoutes[0].pathname, { replace: true });
    }
  }, [accessibleRoutes, location.pathname, navigate]);

  return (
    <>
      <motion.nav
        layout
        // onMouseEnter={() => setSidebarOpen(true)}
        // onMouseLeave={() => {
        //   setSidebarOpen(false);
        // }}
        style={{
          minWidth: sidebarOpen ? "232px" : "68px",
        }}
        className="bg-sidebar sticky top-0 z-[1000] flex h-screen flex-col items-center pb-4 pt-6 shadow-[4px_0_10px_0_rgba(0,0,0,0.15)]"
      >
        <StarBackground numberStars={sidebarOpen ? 100 : 40} />
        <TitleSection open={sidebarOpen} />

        <motion.div
          className={cn("flex-1 overflow-y-auto overflow-x-hidden pr-1.5", {
            "scrollbar [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-600/50 hover:[&::-webkit-scrollbar-thumb]:bg-gray-500/60 [&::-webkit-scrollbar]:w-1":
              sidebarOpen,
            "[&::-webkit-scrollbar]:hidden": !sidebarOpen,
          })}
        >
          <motion.div
            id="sidebar-navLinks"
            className="mt-6 grid place-content-start gap-y-2"
          >
            {accessibleRoutes.map((item) => {
              const isActive = item?.pathname
                ? location?.pathname?.includes(item.pathname)
                : false;

              const hasBorderTop = item?.haveTopBorder;
              return (
                <React.Fragment key={item.key}>
                  {hasBorderTop && (
                    <div
                      className={cn("my-4 ml-1 flex w-full justify-center", {
                        "px-1.5": sidebarOpen,
                      })}
                    >
                      <div
                        className={cn("h-[1px] w-full bg-common-outline", {
                          "w-5": !sidebarOpen,
                        })}
                      />
                    </div>
                  )}
                  <SidebarOption
                    data-testid={item.key}
                    item={item}
                    isActive={isActive}
                    to={item?.pathname || ""}
                    notifs={item?.notifs}
                    open={sidebarOpen}
                  />
                </React.Fragment>
              );
            })}
          </motion.div>
        </motion.div>
        <UserFooter open={sidebarOpen} />
      </motion.nav>
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed inset-0 bg-black/50"
        style={{ zIndex: 999, display: sidebarOpen ? 'block' : 'none' }}
      /> */}
    </>
  );
});

Sidebar.displayName = "Sidebar";

const SidebarOption = React.memo(
  React.forwardRef<
    React.ElementRef<typeof NavLink>,
    React.ComponentPropsWithoutRef<typeof NavLink> & SideBarOptionsProps
  >(({ className, item, isActive, notifs, open, ...props }, ref) => {
    const { Icon } = item;
    return (
      <motion.div
        key={item.key}
        layout
        className={cn("ml-2 grid place-content-start")}
      >
        <TooltipCustom
          trigger={
            <NavLink
              ref={ref}
              className={cn(
                "relative flex h-11 w-11 items-center justify-center gap-2 rounded-[100px] px-4 leading-[17.5px] text-neutral-light-600 transition-colors hover:bg-dim-20 hover:text-neutral-light-400",
                {
                  "bg-dim-60 text-primary-400 hover:bg-dim-60": isActive,
                  "h-[42px] w-[208px] justify-start": open,
                },
                className,
              )}
              {...props}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                layout
                className={cn("grid h-auto w-5 place-content-center text-lg")}
              >
                {Icon && (
                  <Icon
                    className={cn("h-5 w-5", { "h-4 w-4": open })}
                    strokeWidth={open ? 1.75 : 2}
                  />
                )}
              </motion.div>
              {open && (
                <motion.span
                  layout
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.125 }}
                  className={cn("text-sm font-normal", {
                    "font-semibold": isActive,
                  })}
                >
                  {item.title}
                </motion.span>
              )}

              {notifs && open && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ y: "-50%" }}
                  transition={{ delay: 0.5 }}
                  className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
                >
                  {notifs}
                </motion.span>
              )}
            </NavLink>
          }
          tooltipPosition="right"
          contentClassName="w-fit z-[1001]"
        >
          <div className="px-4 py-2 text-xs text-neutral-light-300">
            <span className="text-sm">{item.tootTipContent}</span>
          </div>
        </TooltipCustom>
      </motion.div>
    );
  }),
);
SidebarOption.displayName = "SidebarOption";

const TitleSection = React.memo(({ open }: { open: boolean }) => {
  return (
    <motion.div
      layout
      className={cn("flex w-full items-center px-5 transition-colors", {
        "justify-center": !open,
      })}
    >
      <div className="flex items-center gap-2">
        <motion.div layout className="grid size-10 place-content-center">
          <Logo />
        </motion.div>
        {open && (
          <motion.img
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            srcSet={`${pulsar}`}
            alt="Logo"
            className="h-5"
          />
        )}
      </div>
    </motion.div>
  );
});

TitleSection.displayName = "TitleSection";

const Logo = React.memo(() => {
  return (
    <motion.div layout className="grid size-10 place-content-center">
      <motion.img srcSet={`${logo}`} alt="Logo" />
    </motion.div>
  );
});
Logo.displayName = "Logo";

const UserFooter = React.memo(({ open }: { open: boolean }) => {
  const authStore = useAuthStore();
  const { currentUser } = authStore;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.removeQueries();
    authStore.resetAuthStore();
    authStore.setUserState(UserStateEnum.LOGOUT);
    navigate(ROUTES_PATH.LOGOUT, { replace: true });
    clearAuthToken();
  };
  return (
    <motion.div
      className={cn(
        "z-[1000] mt-2 flex w-full items-center gap-3 border-t border-neutral-dark-500 px-3 pt-3",
        {
          "justify-center": !open,
        },
      )}
    >
      <TooltipCustom
        trigger={
          <div className="z-[1001] flex size-9 cursor-pointer items-center justify-center rounded-full bg-common-surfaceOverlay text-sm capitalize leading-none text-neutral-light-100">
            {getFirstNCharacters(currentUser?.name || "", 1)?.toUpperCase()}
          </div>
        }
        tooltipPosition="top"
        contentClassName="w-fit z-[1002] !bg-transparent !shadow-none !border-none"
      >
        <div className="z-[1002] mb-2 ml-4 w-fit min-w-[274px] rounded-md p-0 !shadow-3dp">
          <div className="flex items-start gap-2 rounded-t-md border border-outline bg-common-surface px-4 py-3">
            <div className="grid size-9 min-w-9 place-content-center rounded-full bg-gray-800">
              <span className="text-sm text-gray-400">
                {getFirstNCharacters(currentUser?.name || "", 1)?.toUpperCase()}
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.075 }}
              className="mr-auto flex flex-col"
            >
              <span className="text-sm font-normal capitalize text-neutral-light-300">
                {currentUser?.name}
              </span>
              <span className="text-sm text-neutral-light-600">
                {currentUser?.email}
              </span>
              <span className="mt-2 max-w-[240px] text-xs font-light text-neutral-light-500">
                {currentUser?.roles
                  ?.map((r) => USER_ROLE_LABELS[r as UserRoleEnum])
                  .join(", ")}
              </span>
            </motion.div>
          </div>

          <div
            onClick={handleLogout}
            className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-b-md border border-t-0 border-outline bg-common-surfaceOverlay px-4 py-[13px] hover:bg-common-outline/95"
          >
            <LogOutIcon className="text-neutral-light-600" />
            <span className="leading-tight text-neutral-light-300">
              Log out
            </span>
          </div>
        </div>
      </TooltipCustom>
      {open && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="mr-auto flex max-w-[calc(100%-60px)] flex-col overflow-hidden break-words"
        >
          <span className="w-full text-sm font-semibold capitalize leading-tight tracking-normal text-neutral-light-300">
            {currentUser?.name}
          </span>
          <div className="relative flex items-center gap-1 text-xs text-neutral-light-500">
            {USER_ROLE_LABELS[currentUser?.roles?.[0] as UserRoleEnum]}
            {currentUser?.roles && currentUser?.roles?.length > 1 && (
              <TooltipCustom
                trigger={
                  <div className="rounded-3xl bg-neutral-dark-700 px-1.5 py-0.5 leading text-white">
                    {`+${currentUser?.roles?.length - 1}`}
                  </div>
                }
                tooltipPosition="top"
                contentClassName="w-fit max-w-[184px] text-left z-[99999] [&_svg]:fill-common-background"
              >
                <div className="gap-2.5 rounded-md bg-common-background px-4 py-2">
                  <span className="max-w-[184px] text-xs leading text-neutral-light-600">
                    {currentUser?.roles
                      ?.map((r) => USER_ROLE_LABELS[r as UserRoleEnum])
                      .join(", ")}
                  </span>
                </div>
              </TooltipCustom>
            )}
          </div>
        </motion.div>
      )}
      {open && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="mr-0 h-[24px] w-[24px]"
              size={"sm"}
              variant="tertiary"
            >
              <EllipsisVertical className="text-primary-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="z-[99999] mb-3.5 ml-4 w-fit min-w-[274px] border border-outline p-0 !shadow-3dp"
          >
            <div className="flex items-start gap-2 rounded-t-md border border-outline bg-common-surface px-4 py-3">
              <div className="grid size-9 min-w-9 place-content-center rounded-full bg-gray-800">
                <span className="text-sm text-gray-400">
                  {getFirstNCharacters(
                    currentUser?.name || "",
                    1,
                  )?.toUpperCase()}
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.075 }}
                className="mr-auto flex flex-col"
              >
                <span className="text-sm font-normal capitalize text-neutral-light-300">
                  {currentUser?.name}
                </span>
                <span className="text-sm text-neutral-light-600">
                  {currentUser?.email}
                </span>
                <span className="mt-2 max-w-[240px] text-xs font-light text-neutral-light-500">
                  {currentUser?.roles
                    ?.map((r) => USER_ROLE_LABELS[r as UserRoleEnum])
                    .join(", ")}
                </span>
              </motion.div>
            </div>

            <div
              onClick={handleLogout}
              className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-b-md border border-t-0 border-outline bg-common-surfaceOverlay px-4 py-[13px] hover:bg-common-outline/45"
            >
              <LogOutIcon className="text-neutral-light-600" />
              <span className="leading-tight text-neutral-light-300">
                Log out
              </span>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </motion.div>
  );
});

UserFooter.displayName = "UserFooter";

const MainContent = () => {
  return (
    <main
      className={cn("h-screen bg-common-background duration-300", {
        "w-[calc(100vw-68px)]": true,
      })}
    >
      <Outlet />
    </main>
  );
};

export { MainContent, Sidebar };
