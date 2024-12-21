import { Alert, Box } from "@mui/material";
import Logo from "assets/images/LoadingIcon.svg";
import { useAppSelector } from "contexts/hooks";
import { motion } from "framer-motion";
import useHistoryChatLocalFetch from "hooks/useHistoryChatLocalFetch";
import React from "react";
import ResultCard from "views/components/Commons/ResualCard";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const LocalResults = () => {
  const user = useAppSelector((state) => state.user.data);
  const results = useAppSelector((state) => state.history.local);
  useHistoryChatLocalFetch();

  if (!user?.uid) {
    return (
      <Box className="w-full flex flex-col items-center justify-center p-4">
        <Alert severity="error">Vui lòng đăng nhập để xem kết quả.</Alert>
      </Box>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <motion.div
        className="flex items-center justify-center p-2 gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img src={Logo} className="w-[50px]" variants={itemVariants} />
        <motion.h1
          className="text-4xl text-primary-color font-bold"
          variants={itemVariants}
        >
          AI LAWYER - Kết Quả Lưu Trữ
        </motion.h1>
      </motion.div>
      <motion.div
        className="max-h-max bg-gray-900 mx-5 rounded-2xl p-2 overflow-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {results.length === 0 ? (
          <motion.div variants={itemVariants} className="mb-2">
            <Alert severity="info">Không có dữ liệu kết quả.</Alert>
          </motion.div>
        ) : (
          results.map((result, index) => (
            <motion.div key={index} variants={itemVariants} className="mb-2">
              <ResultCard {...result} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default LocalResults;