import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import Icon401Animated from "@/components/Icons/Icon401Animated";
import Icon404Animated from "@/components/Icons/Icon404Animated";
import Icon500Animated from "@/components/Icons/Icon500Animated";
import IconMaintainAnimated from "@/components/Icons/IconMaintainAnimated";
import { ShootingStars } from "@/components/Motions/ShootingStars";
import StarBackground from "@/components/Motions/StarBackground";
import { ROUTES_PATH } from "@/constants/router";
import { useAuthStore } from "@/domains/auth/store/authStore";

interface ErrorPageWrapperProps {
  errorType?: "404" | "401" | "500" | "MAINTAIN";
}

const ErrorPageWrapper = ({ errorType = "500" }: ErrorPageWrapperProps) => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const location = useLocation();
  const CONTENT_DATA = {
    404: {
      title: "Sorry, this page is not found",
      icon: <Icon404Animated />,
      description:
        "We couldn’t find the page you are looking for, try going back and try again.",
      buttonText: "Go Back",
      action: () => {
        if (location?.state?.hasAccess === false) navigate(ROUTES_PATH.ROOT);
        navigate(-1);
      },
    },
    401: {
      title: "Sorry, this page is unauthorized",
      icon: <Icon401Animated />,
      description:
        "We couldn’t find the page you are looking for, try going back and try again.",
      buttonText: "Go back to Log in",
      action: async () => {
        authStore.resetAuthStore();
        navigate(ROUTES_PATH.LOGIN);
      },
    },
    500: {
      title: "Something went wrong",
      icon: <Icon500Animated />,
      description:
        "We couldn’t find the page you are looking for, try going back and try again.",
      buttonText: "Go Back",
      action: () => {
        navigate(-1);
      },
    },
    MAINTAIN: {
      title: "We are currently undergoing scheduled maintenance",
      icon: <IconMaintainAnimated />,
      description:
        "We apologise for any inconvenience caused during this time.",
      buttonText: "",
      action: () => {},
    },
  };

  return (
    <div className="bg-error-page relative z-10 flex min-h-screen items-center justify-center">
      <StarBackground />
      <ShootingStars />
      <div className="relative z-10 flex w-auto flex-col justify-center gap-10">
        <div className="grid place-content-center gap-12">
          <motion.div layout className="grid place-content-center">
            {CONTENT_DATA[errorType].icon}
          </motion.div>
          <motion.div
            layout
            className="grid min-h-20 place-content-center gap-y-[13px] text-center"
          >
            <motion.p className="text-2xl font-semibold leading-[30px] text-neutral-light-200">
              {CONTENT_DATA[errorType].title}
            </motion.p>
            <motion.p className="text-normal text-sm leading-[17.5px] text-neutral-light-500">
              {CONTENT_DATA[errorType].description}
            </motion.p>
          </motion.div>
        </div>
        {CONTENT_DATA[errorType].buttonText && (
          <motion.div layout className="grid place-content-center">
            <Button onClick={CONTENT_DATA[errorType].action}>
              {CONTENT_DATA[errorType].buttonText}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ErrorPageWrapper;
