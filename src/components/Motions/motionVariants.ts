import { Variants } from "framer-motion";

// Fade Effects
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};
// Shake Effects
export const shakeVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
    },
  },
};

// Scale Effects
export const scaleVariants: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 1, repeat: Infinity },
  },
  hover: { scale: 1.05 },
};

// Position Effects (Slide)
export const slideVariants: Variants = {
  left: { x: "-100%", opacity: 0 },
  right: { x: "100%", opacity: 0 },
  top: { y: "-100%", opacity: 0 },
  bottom: { y: "100%", opacity: 0 },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4 },
  },
};

// Rotation Effects 45deg
export const rotateVariants: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 45,
    transition: { duration: 0.5 },
  },
  hover: {
    rotate: -45,
    transition: { duration: 0.5 },
  },
};

// Spring Animations
export const springVariants: Variants = {
  initial: { scale: 0.3, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 1,
    },
  },
};

// Bounce Effects
export const bounceVariants: Variants = {
  initial: { y: 0 },
  bounce: {
    y: [-20, 0, -15, 0, -10, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

// Hover and Tap Effects
export const interactionVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

// Gesture Animations (Drag)
export const dragVariants = {
  drag: {
    scale: 1.02,
    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
  },
  dragConstraints: {
    top: -50,
    left: -50,
    right: 50,
    bottom: 50,
  },
};

// Stagger Effects
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

// Advanced Hover States
export const advancedHoverVariants: Variants = {
  initial: {
    background: "linear-gradient(45deg, #ff0000 0%, #00ff00 100%)",
    scale: 1,
  },
  hover: {
    background: "linear-gradient(225deg, #00ff00 0%, #ff0000 100%)",
    scale: 1.1,
    filter: "hue-rotate(90deg)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Glitch Effect
export const glitchVariants: Variants = {
  initial: {
    clipPath: "inset(0 0 0 0)",
    filter: "none",
  },
  animate: {
    clipPath: ["inset(0 0 0 0)", "inset(100% 0 0 0)", "inset(50% 0 50% 0)", "inset(0 0 0 0)"],
    filter: ["none", "hue-rotate(90deg)", "hue-rotate(-90deg)", "none"],
    x: [0, -5, 5, 0],
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

// Magnetic Hover
export const magneticVariants: Variants = {
  hover: (mousePosition: { x: number; y: number }) => ({
    x: mousePosition.x * 30,
    y: mousePosition.y * 30,
    transition: {
      type: "spring",
      mass: 0.5,
      stiffness: 150,
      damping: 15,
    },
  }),
};

// Typewriter Variants
export const typewriterVariants: Variants = {
  initial: { width: 0 },
  animate: (text: string) => ({
    width: `${text.length}ch`,
    transition: {
      type: "tween",
      duration: text.length * 0.1,
      ease: "linear",
    },
  }),
};
