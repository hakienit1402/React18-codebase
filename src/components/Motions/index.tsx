/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import {
  HTMLMotionProps,
  motion,
  MotionValue,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import * as motionVariants from "./motionVariants";

// Base interfaces
interface BaseMotionProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  className?: string;
}

interface BaseImageProps extends Omit<HTMLMotionProps<"img">, "children"> {
  src: string;
  alt: string;
  className?: string;
}

// Shake Components
export const ShakeDiv: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.div
    variants={motionVariants.shakeVariants}
    initial="initial"
    animate="animate"
    className={className}
  >
    {children}
  </motion.div>
);

// Fade Components
export const FadeDiv: React.FC<BaseMotionProps> = ({ children, className }) => (
  <motion.div
    variants={motionVariants.fadeVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <motion.img
    src={src}
    alt={alt}
    variants={motionVariants.fadeVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={className}
    {...props}
  />
);

export const FadeSpan: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.span
    variants={motionVariants.fadeVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={className}
  >
    {children}
  </motion.span>
);

export const FadeP: React.FC<BaseMotionProps> = ({ children, className }) => (
  <motion.p
    variants={motionVariants.fadeVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={className}
  >
    {children}
  </motion.p>
);

export const FadeButton: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.button
    variants={motionVariants.fadeVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={className}
  >
    {children}
  </motion.button>
);

// Slide Components
export const SlideDiv: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.div
    variants={motionVariants.slideVariants}
    initial="left"
    animate="center"
    exit="right"
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <motion.img
    src={src}
    alt={alt}
    variants={motionVariants.slideVariants}
    initial="left"
    animate="center"
    exit="right"
    className={className}
    {...props}
  />
);

export const SlideSpan: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.span
    variants={motionVariants.slideVariants}
    initial="left"
    animate="center"
    exit="right"
    className={className}
  >
    {children}
  </motion.span>
);

export const SlideP: React.FC<BaseMotionProps> = ({ children, className }) => (
  <motion.p
    variants={motionVariants.slideVariants}
    initial="left"
    animate="center"
    exit="right"
    className={className}
  >
    {children}
  </motion.p>
);

export const SlideButton: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.button
    variants={motionVariants.slideVariants}
    initial="left"
    animate="center"
    exit="right"
    className={className}
  >
    {children}
  </motion.button>
);

// Scale Components
export const ScaleDiv: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.div
    variants={motionVariants.scaleVariants}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <motion.img
    src={src}
    alt={alt}
    variants={motionVariants.scaleVariants}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={className}
    {...props}
  />
);

export const ScaleSpan: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.span
    variants={motionVariants.scaleVariants}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={className}
  >
    {children}
  </motion.span>
);

export const ScaleP: React.FC<BaseMotionProps> = ({ children, className }) => (
  <motion.p
    variants={motionVariants.scaleVariants}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={className}
  >
    {children}
  </motion.p>
);

export const ScaleButton: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.button
    variants={motionVariants.scaleVariants}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={className}
  >
    {children}
  </motion.button>
);

// Rotate Components
export const RotateDiv: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.div
    whileHover="hover"
    variants={motionVariants.rotateVariants}
    initial="initial"
    // animate="animate"
    className={className}
  >
    {children}
  </motion.div>
);

export const RotateImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <motion.img
    src={src}
    alt={alt}
    variants={motionVariants.rotateVariants}
    initial="initial"
    // animate="animate"
    whileHover="hover"
    className={className}
    {...props}
  />
);

export const RotateSpan: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.span
    variants={motionVariants.rotateVariants}
    initial="initial"
    // animate="animate"
    whileHover="hover"
    className={className}
  >
    {children}
  </motion.span>
);

export const RotateButton: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.button
    variants={motionVariants.rotateVariants}
    initial="initial"
    // animate="animate"
    whileHover="hover"
    className={className}
  >
    {children}
  </motion.button>
);

// Bounce Components
export const BounceDiv: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.div
    variants={motionVariants.bounceVariants}
    initial="initial"
    animate="bounce"
    className={className}
  >
    {children}
  </motion.div>
);

export const BounceImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <motion.img
    src={src}
    alt={alt}
    variants={motionVariants.bounceVariants}
    initial="initial"
    animate="bounce"
    className={className}
    {...props}
  />
);

export const BounceSpan: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.span
    variants={motionVariants.bounceVariants}
    initial="initial"
    animate="bounce"
    className={className}
  >
    {children}
  </motion.span>
);

export const BounceButton: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.button
    variants={motionVariants.bounceVariants}
    initial="initial"
    animate="bounce"
    className={className}
  >
    {children}
  </motion.button>
);

// Interactive Components
export const InteractiveDiv: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.div
    variants={motionVariants.interactionVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={className}
  >
    {children}
  </motion.div>
);

export const InteractiveImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <motion.img
    src={src}
    alt={alt}
    variants={motionVariants.interactionVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={className}
    {...props}
  />
);

export const InteractiveButton: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.button
    variants={motionVariants.interactionVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={className}
  >
    {children}
  </motion.button>
);

// Spring Components
export const SpringDiv: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.div
    variants={motionVariants.springVariants}
    initial="initial"
    animate="animate"
    className={className}
  >
    {children}
  </motion.div>
);

export const SpringImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <motion.img
    src={src}
    alt={alt}
    variants={motionVariants.springVariants}
    initial="initial"
    animate="animate"
    className={className}
    {...props}
  />
);

export const SpringButton: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.button
    variants={motionVariants.springVariants}
    initial="initial"
    animate="animate"
    className={className}
  >
    {children}
  </motion.button>
);

// HoverCard Component
export const HoverCard: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.div
    variants={motionVariants.advancedHoverVariants}
    initial="initial"
    whileHover="hover"
    className={className}
  >
    {children}
  </motion.div>
);

// Container with Stagger Effect Components
interface StaggerContainerProps extends BaseMotionProps {
  delayChildren?: number;
  staggerChildren?: number;
}

export const MotionContainer: React.FC<StaggerContainerProps> = ({
  children,
  className,
  delayChildren = 0.2,
  staggerChildren = 0.1,
}) => (
  <motion.div
    variants={motionVariants.containerVariants}
    initial="hidden"
    animate="show"
    className={className}
    custom={{ delayChildren, staggerChildren }}
  >
    {children}
  </motion.div>
);

export const MotionItem: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.div variants={motionVariants.itemVariants} className={className}>
    {children}
  </motion.div>
);

// Pulse Components
export const PulseDiv: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.div
    className={className}
    animate={{
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    {children}
  </motion.div>
);

export const PulseButton: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.button
    className={className}
    animate={{
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    {children}
  </motion.button>
);

export const PulseImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <motion.img
    src={src}
    alt={alt}
    className={className}
    animate={{
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
    {...props}
  />
);

// Split Text Component
interface SplitTextProps extends BaseMotionProps {
  text: string;
  staggerChildren?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className,
  staggerChildren = 0.05,
}) => {
  return (
    <motion.div className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * staggerChildren,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Hover Effect Image Component
interface HoverEffectImageProps extends BaseImageProps {
  hoverEffects?: {
    scale?: number;
    rotate?: number;
    filter?: string;
  };
}

export const HoverEffectImage: React.FC<HoverEffectImageProps> = ({
  src,
  alt,
  className,
  hoverEffects = {
    scale: 1.1,
    rotate: 5,
    filter: "brightness(1.2)",
  },
  ...props
}) => (
  <motion.img
    src={src}
    alt={alt}
    className={className}
    initial={{ scale: 1, rotate: 0 }}
    whileHover={{
      scale: hoverEffects.scale,
      rotate: hoverEffects.rotate,
      filter: hoverEffects.filter,
    }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 20,
    }}
    {...props}
  />
);

// Combined Effect Card
interface CombinedEffectProps extends BaseMotionProps {
  enableHover?: boolean;
  enableTap?: boolean;
  enableRotate?: boolean;
}

interface CombinedEffectProps extends BaseMotionProps {
  enableHover?: boolean;
  enableTap?: boolean;
  enableRotate?: boolean;
  perspective?: number;
  rotateRange?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
  };
}

export const CombinedEffectCard: React.FC<CombinedEffectProps> = ({
  children,
  className,
  enableHover = true,
  enableTap = true,
  enableRotate = true,
  perspective = 1000,
  rotateRange = 30,
  springConfig = { stiffness: 400, damping: 17 },
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(
    mouseY,
    [-100, 100],
    [rotateRange, -rotateRange],
  );
  const rotateY = useTransform(
    mouseX,
    [-100, 100],
    [-rotateRange, rotateRange],
  );

  const transformStyle = {
    perspective,
    transformStyle: "preserve-3d" as const,
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const resetPosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ ...transformStyle, rotateX, rotateY }}
      whileHover={enableHover ? { scale: 1.05, z: 50 } : undefined}
      whileTap={enableTap ? { scale: 0.95, z: 0 } : undefined}
      onMouseMove={enableRotate ? handleMouseMove : undefined}
      onMouseLeave={enableRotate ? resetPosition : undefined}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.1}
      transition={{
        type: "spring",
        ...springConfig,
        duration: 0,
      }}
    >
      {children}
    </motion.div>
  );
};
// Typewriter Component
interface TypewriterProps {
  text: string;
  className?: string;
  cursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterProps> = ({
  text,
  className,
  cursor = true,
}) => {
  return (
    <motion.div
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        ...(cursor && { borderRight: "2px solid currentColor" }),
      }}
      variants={motionVariants.typewriterVariants}
      initial="initial"
      animate="animate"
      custom={text}
      className={className}
    >
      {text}
    </motion.div>
  );
};

// Draggable Components
interface DraggableProps extends BaseMotionProps {
  dragConstraints?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  dragElastic?: number | boolean;
  dragMomentum?: boolean;
  onDragEnd?: (
    event:
      | globalThis.MouseEvent
      | globalThis.TouchEvent
      | globalThis.PointerEvent,
  ) => void;
}

export const DraggableCard: React.FC<DraggableProps> = ({
  children,
  className,
  dragConstraints,
  dragElastic = 0.5,
  dragMomentum = true,
  onDragEnd,
}) => (
  <motion.div
    className={className}
    drag
    dragConstraints={dragConstraints}
    dragElastic={dragElastic}
    dragMomentum={dragMomentum}
    whileDrag={{ scale: 1.1, zIndex: 1 }}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    onDragEnd={onDragEnd}
  >
    {children}
  </motion.div>
);

export const DraggableItem: React.FC<DraggableProps> = ({
  children,
  className,
  dragConstraints,
  dragElastic = 0.5,
  onDragEnd,
}) => (
  <motion.div
    className={className}
    drag
    dragConstraints={dragConstraints}
    dragElastic={dragElastic}
    whileDrag={{ scale: 1.05, zIndex: 1 }}
    onDragEnd={onDragEnd}
    animate={{ scale: 1 }}
    initial={{ scale: 0 }}
  >
    {children}
  </motion.div>
);

// Glitch Components
export const GlitchText: React.FC<BaseMotionProps> = ({
  children,
  className,
}) => (
  <motion.span
    variants={motionVariants.glitchVariants}
    initial="initial"
    animate="animate"
    className={className}
  >
    {children}
  </motion.span>
);

export const GlitchImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <motion.img
    src={src}
    alt={alt}
    variants={motionVariants.glitchVariants}
    initial="initial"
    animate="animate"
    className={className}
    {...props}
  />
);

// Gradient Text Component
interface GradientTextProps extends BaseMotionProps {
  text: string;
  gradient?: string;
  duration?: number;
}

export const GradientText: React.FC<GradientTextProps> = ({
  text,
  gradient = "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
  duration = 3,
  className,
}) => {
  return (
    <motion.span
      className={className}
      style={{
        background: gradient,
        backgroundSize: "300% 300%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
};

// Floating Element Component
interface FloatingProps extends BaseMotionProps {
  yOffset?: number;
  duration?: number;
}

export const FloatingElement: React.FC<FloatingProps> = ({
  children,
  yOffset = 20,
  duration = 2,
  className,
}) => (
  <motion.div
    className={className}
    animate={{
      y: [-yOffset, yOffset],
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

// Scroll Reveal Component
interface ScrollRevealProps extends BaseMotionProps {
  threshold?: number;
  animation?: "fade" | "slide" | "scale";
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  threshold = 0.1,
  animation = "fade",
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, threshold]);

  const variants = {
    hidden: {
      opacity: 0,
      y: animation === "slide" ? 50 : 0,
      scale: animation === "scale" ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MarqueeProps extends BaseMotionProps {
  text: string;
  speed?: number;
  separator?: string;
  direction?: "left" | "right";
}

export const MarqueeText: React.FC<MarqueeProps> = ({
  text,
  className,
  speed = 20,
  separator = "   ",
  direction = "left",
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (container.current) {
      setContentWidth(container.current.offsetWidth);
    }
  }, [text]);

  return (
    <motion.div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <motion.div
        ref={container}
        style={{ display: "inline-block" }}
        initial={{ x: 0 }}
        animate={{
          x: direction === "left" ? -contentWidth : contentWidth,
        }}
        transition={{
          duration: contentWidth / speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {text}
        {separator}
        {text}
      </motion.div>
    </motion.div>
  );
};

interface MagneticGalleryProps extends BaseMotionProps {
  images: Array<{ src: string; alt: string }>;
  columns?: number;
  gap?: number;
  strength?: number;
}

export const MagneticGallery: React.FC<MagneticGalleryProps> = ({
  images,
  className,
  columns = 3,
  gap = 20,
  strength = 30,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<
    Array<{ x: MotionValue<number>; y: MotionValue<number> }>
  >([]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    setItems(
      images.map(() => ({
        x,
        y,
      })),
    );
  }, [images.length]);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!containerRef.current) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    items[index].x.set(distanceX / strength);
    items[index].y.set(distanceY / strength);
  };

  const handleMouseLeave = (index: number) => {
    items[index].x.set(0);
    items[index].y.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        width: "100%",
      }}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          style={{
            position: "relative",
            overflow: "hidden",
            x: items[index]?.x,
            y: items[index]?.y,
          }}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseLeave={() => handleMouseLeave(index)}
          whileHover={{ scale: 1.05 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <motion.img
            src={image.src}
            alt={image.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// ScrambleText Component
interface ScrambleTextProps extends BaseMotionProps {
  text: string;
  scrambleSpeed?: number;
  characters?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className,
  scrambleSpeed = 50,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const finalText = useRef(text);
  const iteration = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((current) =>
        current
          .split("")
          .map((char, index) => {
            if (index < iteration.current) {
              return finalText.current[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join(""),
      );

      iteration.current += 1 / 3;

      if (iteration.current >= finalText.current.length) {
        clearInterval(interval);
      }
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, scrambleSpeed, characters]);

  return (
    <motion.span className={className} style={{ fontFamily: "monospace" }}>
      {displayText}
    </motion.span>
  );
};

// Advanced Animation Components
interface FadeInProps extends BaseMotionProps {
  duration?: number;
  delay?: number;
  ease?: string;
  once?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  duration = 0.6,
  delay = 0,
  ease = "easeOut",
  once = true,
  ...props
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: once });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          transition: { duration, delay, ease },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface SlideInProps extends BaseMotionProps {
  direction?: "left" | "right" | "up" | "down";
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  className,
  direction = "left",
  distance = 50,
  duration = 0.6,
  delay = 0,
  once = true,
  ...props
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: once });

  const slideVariants = {
    hidden: {
      x:
        direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={slideVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface ScaleInProps extends BaseMotionProps {
  initialScale?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  className,
  initialScale = 0.5,
  duration = 0.6,
  delay = 0,
  once = true,
  ...props
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: once });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: initialScale, opacity: 0 }}
      animate={controls}
      variants={{
        visible: {
          scale: 1,
          opacity: 1,
          transition: { duration, delay, ease: "easeOut" },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface TextAnimationProps extends BaseMotionProps {
  text: string;
  type?: "typing" | "fadeInLetters" | "slideUp";
  typeSpeed?: number;
  staggerDelay?: number;
}

export const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  type = "typing",
  typeSpeed = 50,
  staggerDelay = 0.02,
  className,
  ...props
}) => {
  if (type === "typing") {
    return (
      <motion.div
        className={className}
        {...props}
        initial={{ width: 0 }}
        animate={{ width: "auto" }}
        transition={{ duration: text.length * (typeSpeed / 1000) }}
        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
      >
        {text}
      </motion.div>
    );
  }

  return (
    <motion.div className={className} {...props}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: type === "slideUp" ? 20 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * staggerDelay,
            ease: "easeOut",
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Clock Component
interface ClockProps extends BaseMotionProps {
  type?: "analog" | "digital";
  showSeconds?: boolean;
  size?: number;
  clockColor?: string;
}

export const AnimatedClock: React.FC<ClockProps> = ({
  className,
  size = 200,
  clockColor = "#333",
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        fontSize: size / 4,
        color: clockColor,
        fontFamily: "monospace",
      }}
    >
      {time.toLocaleTimeString()}
    </motion.div>
  );
};
