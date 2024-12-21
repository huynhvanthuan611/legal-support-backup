import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import blogService, { Blog } from "server/blog";

const CreateBlog: React.FC = () => {
  const [blog, setBlog] = useState<Blog>({
    ref: "",
    heading: "",
    description: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdBlog = await blogService.createBlog(blog);
      alert("Create blog success");
      console.log("Created Blog:", createdBlog);
      // Reset state to initial empty values
      setBlog({
        ref: "",
        heading: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4"
    >
      <Typography variant="h4">Create Blog</Typography>
      <TextField
        label="Heading"
        name="heading"
        value={blog.heading}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={blog.description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
      />
      <TextField
        label="Reference Link"
        name="ref"
        value={blog.ref}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Image URL"
        name="image"
        value={blog.image}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      {blog.image && (
        <img
          src={blog.image}
          alt="Preview"
          style={{ width: "100%", height: "20vh", objectFit: "contain" }}
        />
      )}
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </Box>
  );
};

export default CreateBlog;
