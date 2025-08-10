import { Variants } from "framer-motion";

const starVariants: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const circleVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const hammerVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const purpleCircleVariants: Variants = {
  initial: {
    y: 0,
    x: 0,
  },
  animate: {
    y: [0, -2, -4, -2, 0, 2, 4, 2, 0],
    x: [0, 2, 3, 2, 0, 2, 3, 2, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
    },
  },
};

export { starVariants, circleVariants, hammerVariants, purpleCircleVariants };
