import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface FullPageLoadingProps {
  message?: string;
}

const spinTransition = {
  repeat: Infinity,
  ease: "linear",
  duration: 1.5,
};

const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const FullPageLoading: React.FC<FullPageLoadingProps> = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-common-background"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={spinTransition}
      >
        <Loader2 className="h-14 w-14 text-primary-500" strokeWidth={2} />
      </motion.div>
    </motion.div>
  );
};

export default FullPageLoading;
