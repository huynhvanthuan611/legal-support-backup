import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import blogService, { Blog } from "server/blog";

const BlogView: React.FC = () => {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAllBlogs();
      setBlogs(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  React.useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (ref: string, event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await blogService.deleteBlog(ref);
      alert("Blog deleted successfully");
      fetchBlogs(); // Refetch blogs after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  return (
    <Box className="grid grid-cols-4 gap-4 p-4">
      {blogs.map((blog) => (
        <Link to={`/blog/${blog.ref}`} key={blog.ref}>
          <Card className="flex flex-col gap-4 p-4">
            {blog.image && (
              <CardMedia
                component="img"
                image={blog.image}
                alt={blog.heading}
                sx={{ objectFit: "contain", height: "20vh" }}
              />
            )}
            <CardContent>
              <Box className="flex justify-between items-center">
                <Typography variant="h5">{blog.heading}</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {blog.description}
              </Typography>
            </CardContent>
            <CardActions className="flex justify-between">
              <IconButton
                onClick={(event) => handleDelete(blog.ref, event)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default BlogView;
