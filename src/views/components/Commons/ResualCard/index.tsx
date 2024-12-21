import React, { useState } from "react";
import { Box, Typography, IconButton, Collapse, Chip } from "@mui/material";
import {
  Person,
  Event,
  ExpandMore,
  ExpandLess,
  Phone,
  Info,
  Wc,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import { historyPost, historyLocalRemove } from "contexts/history";
import { Result } from "contexts/question/quesitionType";
import useToastily from "hooks/useToastily";

interface ResultCardProps extends Result {}

const ResultCard: React.FC<ResultCardProps> = ({
  answer,
  caseType,
  fullName,
  gender,
  phone,
  question,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const showToast = useToastily();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleToggleFavorite = () => {
    if (!user?.uid) {
      showToast({
        content: "Vui lòng đăng nhập để lưu bản ghi.",
        type: "error",
      });
      return;
    }
    setIsFavorite(!isFavorite);
    const payload = {
      answer,
      caseType,
      fullName,
      phone,
      question,
      gender,
      uid: user?.uid ?? "",
    };

    if (isFavorite) {
    } else {
      dispatch(historyPost(payload));
      dispatch(historyLocalRemove(payload));
      showToast({
        content: "Bản ghi lưu thành công.",
        type: "success",
      });
    }
  };

  return (
    <Box className="max-h-max bg-gray-800 rounded-2xl p-2 overflow-auto">
      <Box className="w-full h-full rounded-2xl flex p-6 flex-col gap-4 bg-gray-900">
        <Box className="flex items-center gap-2">
          <Person className="text-primary-color" />
          <Typography variant="h6" className="text-white">
            {fullName}
          </Typography>
          <Event className="text-primary-color" />
          <Typography variant="body2" className="text-white">
            {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        <Box className="flex items-center gap-2">
          <Typography variant="body1" className="text-white">
            {question}
          </Typography>
        </Box>

        <Box className="flex justify-between items-center">
          <Chip label={caseType} className="text-white" />
          <Box className="flex items-center gap-2">
            <IconButton onClick={handleToggleFavorite} className="text-white">
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton onClick={handleExpandClick} className="text-white">
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={expanded} timeout="auto" className="p-2" unmountOnExit>
          <Box className="flex flex-col gap-2 p-2 bg-gray-800 rounded-md">
            <Box className="flex items-center gap-2">
              <Wc className="text-primary-color" />
              <Typography variant="body2" className="text-white">
                <strong>Giới tính:</strong> {gender}
              </Typography>
            </Box>
            <Box className="flex items-center gap-2">
              <Phone className="text-primary-color" />
              <Typography variant="body2" className="text-white">
                <strong>Số điện thoại:</strong> {phone}
              </Typography>
            </Box>
            <Box className="flex items-center gap-2">
              <Info className="text-primary-color" />
              <Typography
                variant="body2"
                className="text-white"
                style={{ whiteSpace: "pre-wrap" }}
              >
                <strong>Câu trả lời:</strong> {answer}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default ResultCard;
