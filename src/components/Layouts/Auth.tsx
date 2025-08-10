import { motion } from "framer-motion";

import logo from "@/assets/logo-icon.svg";
import pulsar from "@/assets/Pulsar.png";
import JumpingText from "@/components/Motions/JumpingText";

const AuthLogo = () => {
  return (
    <motion.div
      className="flex items-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-[94px] w-full flex-col items-center gap-6 lg:items-start">
        <div className="flex items-center gap-4">
          <motion.img
            srcSet={`${logo}`}
            alt="Logo"
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="size-9"
          />
          <motion.img
            srcSet={`${pulsar}`}
            alt="pulsar"
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="h-9"
          />
        </div>
        <div className="text-base leading-5 text-neutral-light-300">
          <JumpingText text="Welcome to Pulsar" />
        </div>
      </div>
    </motion.div>
  );
};

export { AuthLogo };
