import { motion } from "framer-motion";
import { useCallback } from "react";

import { Button } from "@/components/Button";
import Icon500Animated from "@/components/Icons/Icon500Animated";
import { ShootingStars } from "@/components/Motions/ShootingStars";
import StarBackground from "@/components/Motions/StarBackground";

const NoInternetPage = () => {
  const handleOnline = useCallback(() => {
    window.location.reload();
  }, []);

  const handleReload = () => {
    handleOnline();
  };

  return (
    <div className="bg-error-page relative z-10 flex min-h-screen items-center justify-center">
      <StarBackground />
      <ShootingStars />
      <div className="relative z-10 flex w-auto flex-col justify-center gap-10">
        <div className="grid place-content-center gap-12">
          <motion.div layout className="grid place-content-center">
            <Icon500Animated />
          </motion.div>
          <motion.div
            layout
            className="grid min-h-20 place-content-center gap-y-[13px] text-center"
          >
            <motion.p className="text-2xl font-semibold leading-[30px] text-neutral-light-200">
              No internet
            </motion.p>
            <motion.p className="text-normal text-sm leading-[17.5px] text-neutral-light-500">
              Please check your internet connection and try again.
            </motion.p>
          </motion.div>
        </div>

        <motion.div layout className="grid place-content-center">
          <Button onClick={handleReload}>Refresh</Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NoInternetPage;
