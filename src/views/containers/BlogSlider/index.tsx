import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import blogService, { Blog } from "server/blog";

const BlogSlider: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.getAllBlogs();
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  
  return (
    <Box sx={{ margin: 4 }}>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {blogs.map((blog, index) => (
          <SwiperSlide key={index}>
            <a href={blog.ref} target="_blank" rel="noopener noreferrer">
              <Box
                sx={{
                  p: 2,
                  bgcolor: "white",
                  borderRadius: 2,
                  border: "2px solid transparent",
                  transition: "border-color 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <img
                  src={blog.image}
                  alt={blog.heading}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <Typography variant="h6" sx={{ color: "primary.main", mt: 2 }}>
                  {blog.heading}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  {blog.description}
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  endIcon={<ArrowRight />}
                  sx={{ justifyContent: "space-between" }}
                >
                Đọc Ngay
                </Button>
              </Box>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default BlogSlider;
