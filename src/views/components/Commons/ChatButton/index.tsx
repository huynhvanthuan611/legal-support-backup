import herro01 from "assets/images/Frame 7.svg";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import RouterPath from "routers/routesContants";

const ChatButton = () => {
  return (
    <div className="relative">
      <motion.div
        className="fixed z-[10000] bg-white bottom-4 right-4 gap-2 text-primary-color border-solid border-primary-color flex align-middle justify-center items-center border-2 border-primary rounded-full p-2"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: [1, 1.05, 1],
          transition: { duration: 1.5, repeat: Infinity },
        }}
      >
        <Link
          to={RouterPath.CHAT}
          className="flex items-center gap-2 text-primary-color"
        >
          <img src={herro01} alt="Hero" className="w-[30px] h-auto" />
          <span className="text-primary font-bold hover:bg-primary transition duration-300">
            Tư Vấn AI
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

ChatButton.propTypes = {};

export default ChatButton;
