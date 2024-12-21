import { ArrowRight } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "contexts/hooks";
import useFetchOffice from "hooks/useFetchOffice";
import React from "react";
import { Link } from "react-router-dom";
import RouterPath from "routers/routesContants";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards"; // Import the cards effect CSS
import { Autoplay, EffectCards } from "swiper/modules"; // Import EffectCards
import { Swiper, SwiperSlide } from "swiper/react";

const LawFirmCardSlider: React.FC = () => {
  useFetchOffice();
  const lawFirms = useAppSelector((state) => state.business.office.data);

  return (
    <Box sx={{ margin: 4, width: "30vw" }}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        effect="cards" // Add the cards effect
        modules={[Autoplay, EffectCards]} // Include the EffectCards module
      >
        {lawFirms.map((firm, index) => (
          <SwiperSlide key={index}>
            <Link to={RouterPath.getOffice(firm?.ref_id || '')}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "white",
                  borderRadius: 2,
                  width: "100%",
                  border: "2px solid transparent",
                  transition: "border-color 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <img
                  src={firm.image}
                  alt={firm.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <Typography variant="h6" sx={{ color: "primary.main", mt: 2 }}>
                  {firm.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  {firm.description}
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  endIcon={<ArrowRight />}
                  sx={{ justifyContent: "space-between" }}
                >
                  {firm.action}
                </Button>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default LawFirmCardSlider;
