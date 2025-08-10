import { motion } from "framer-motion";

const JumpingText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 8, rotate: 15, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 1200,
            damping: 18,
            delay: index * 0.03,
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

export default JumpingText;
