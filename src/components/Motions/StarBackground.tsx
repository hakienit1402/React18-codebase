import { motion } from "framer-motion";
import { memo } from "react";

import StarIcon from "@/components/Icons/Star";

const StarBackground = ({ numberStars = 300 }: { numberStars?: number }) => {
  const stars = Array.from({ length: numberStars });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((_, index) => {
        const size = Math.random() * 2 + 1.5;
        return (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              color: "rgba(255, 255, 255, 0.5)",
              opacity: 0.5,
              transform: `scale(${size / 28})`,
            }}
            animate={{
              opacity: [0, 0.25, 0],
              scale: [`${size / 28}`, `${(size * 1.2) / 28}`, `${size / 28}`],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
            }}
          >
            <StarIcon />
          </motion.div>
        );
      })}
    </div>
  );
};

export default memo(StarBackground);
