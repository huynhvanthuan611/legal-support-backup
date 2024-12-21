import React, { useState, useCallback } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Office, officeCreate } from "contexts/business";
import { useAppDispatch } from "contexts/hooks";

const CreateBusiness: React.FC = () => {
  const [office, setOffice] = useState<Office>({
    name: "",
    image: "",
    action: "",
    description: "",
    priority: 1,
    body: "",
    create_at: new Date(),
  });

  const dispatch = useAppDispatch();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOffice((prevOffice) => ({
      ...prevOffice,
      [name]: name === "priority" ? Number(value) : value,
    }));
  };

  const handleEditorChange = useCallback((state: EditorState) => {
    setEditorState(state);
    setOffice((prevOffice) => ({
      ...prevOffice,
      body: draftToHtml(convertToRaw(state.getCurrentContent())),
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(officeCreate(office));
    alert("Create business success");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4"
    >
      <Typography variant="h4">Create Business</Typography>
      <TextField
        label="Name"
        name="name"
        value={office.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Image URL"
        name="image"
        value={office.image}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      {office.image && (
        <img
          src={office.image}
          alt="Preview"
          style={{ width: "100%", height: "20vh", objectFit: "contain" }}
        />
      )}
      <TextField
        label="Action"
        name="action"
        value={office.action}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={office.description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
      />
      <TextField
        label="Priority"
        name="priority"
        type="number"
        value={office.priority}
        onChange={handleChange}
        fullWidth
        required
      />
      <div className="bg-slate-900 p-2 rounded-sm">
        <Typography variant="h6">Body</Typography>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={handleEditorChange}
        />
      </div>
      <TextField
        label="Create At"
        name="create_at"
        type="date"
        value={office.create_at.toISOString().split("T")[0]}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </Box>
  );
};

CreateBusiness.propTypes = {};

export default CreateBusiness;
