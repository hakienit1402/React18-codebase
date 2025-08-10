import { motion } from "framer-motion";

const LoadingDots = () => {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-current"
          initial={{ y: 0 }}
          animate={{ y: [-2, 2] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.3,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default LoadingDots;
