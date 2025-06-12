import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { useDispatch } from "react-redux";
import { addBlog } from "../redux/slices/blogSlice";
import { useNavigate } from "react-router-dom";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  coverImage: Yup.mixed().required("Cover image is required"),
  description: Yup.string()
    .min(50, "Description must be 50 characters")
    .required("Description is required"),
});

const AddBlog: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [sectionImagePreviews, setSectionImagePreviews] = useState<string[]>(
    []
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      coverImage: null as File | null,
      description: "",
      author: "",
      sections: [
        {
          heading: "",
          content: "",
          image: null as File | null,
          imagePreview: "",
        },
      ],
    },
    validationSchema,
    onSubmit: (values) => {
      const blogData = {
        id: Date.now(),
        title: values.title,
        coverImageUrl: coverImagePreview || "",
        description: values.description,
        author: values.author,
        sections: values.sections.map((sec, idx) => ({
          heading: sec.heading,
          content: sec.content,
          image: sectionImagePreviews[idx] || "",
        })),
      };
      dispatch(addBlog(blogData));
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/blog-cards");
      }, 1200);
    },
  });

  // Cover image handler
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("coverImage", e.target.files[0]);
      setCoverImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Section image handler
  const handleSectionImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      formik.setFieldValue(`sections[${idx}].image`, file);
      const previews = [...sectionImagePreviews];
      previews[idx] = URL.createObjectURL(file);
      setSectionImagePreviews(previews);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "rgba(239, 239, 239, 1)" }}>
      <Navbar />
      <Box
        sx={{
          mt: { xs: "56px", sm: "64px" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          minHeight: "calc(100vh - 56px)",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            minHeight: "100%",
            position: "sticky",
            top: { xs: "56px", sm: "64px" },
          }}
        >
          <Menu />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            pt: 2,
            minHeight: "calc(100vh - 64px)",
            px: { xs: 1, sm: 2 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              width: { xs: "100%", sm: 600, md: 800, lg: 900 },
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 3,
                textAlign: "left",
                width: "100%",
              }}
            >
              Create New Blog
            </Typography>
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                {/* Title */}
                <Box>
                  <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                    Title{" "}
                    <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    required
                  />
                </Box>
                {/* Cover Image */}
                <Box>
                  <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                    Cover Image{" "}
                    <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AddPhotoAlternateIcon />}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      mb: 1,
                    }}
                  >
                    Choose file to upload
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleCoverImageChange}
                    />
                  </Button>
                  {formik.touched.coverImage && formik.errors.coverImage && (
                    <Typography color="error" variant="caption">
                      {formik.errors.coverImage as string}
                    </Typography>
                  )}
                  {coverImagePreview && (
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <img
                        src={coverImagePreview}
                        alt="Cover Preview"
                        style={{
                          width: "100%",
                          maxWidth: 250,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  )}
                </Box>
                {/* Description */}
                <Box>
                  <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                    Description{" "}
                    <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={4}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    required
                  />
                </Box>
                {/* Author Name */}
                <Box>
                  <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                    Author Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {/* Sections */}
                <FieldArray
                  name="sections"
                  render={(arrayHelpers) => (
                    <Box>
                      <Typography sx={{ fontWeight: 500, mb: 1 }}>
                        Sections
                      </Typography>
                      {formik.values.sections.map((section, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 2,
                            p: 2,
                            mb: 2,
                            position: "relative",
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              color: "red",
                            }}
                            onClick={() => arrayHelpers.remove(idx)}
                            disabled={formik.values.sections.length === 0}
                          >
                            <CloseIcon />
                          </IconButton>
                          <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                            Heading
                          </Typography>
                          <TextField
                            variant="outlined"
                            fullWidth
                            name={`sections[${idx}].heading`}
                            value={section.heading}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                            Content
                          </Typography>
                          <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={3}
                            name={`sections[${idx}].content`}
                            value={section.content}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <Typography sx={{ fontWeight: 500, mb: 0.5, mt: 2 }}>
                            Section Image
                          </Typography>
                          <Button
                            variant="outlined"
                            component="label"
                            startIcon={<AddPhotoAlternateIcon />}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              mb: 1,
                              bgcolor: "#fff",
                              width: { xs: "100%", sm: "auto" },
                            }}
                          >
                            Choose file to upload
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={(e) => handleSectionImageChange(e, idx)}
                            />
                          </Button>
                          {sectionImagePreviews[idx] && (
                            <Box sx={{ mt: 1 }}>
                              <img
                                src={sectionImagePreviews[idx]}
                                alt="Section Preview"
                                style={{
                                  width: "100%",
                                  maxWidth: 200,
                                  borderRadius: 8,
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      ))}
                      <Button
                        variant="outlined"
                        onClick={() =>
                          arrayHelpers.push({
                            heading: "",
                            content: "",
                            image: null,
                            imagePreview: "",
                          })
                        }
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          mt: 1,
                          bgcolor: "#1976d2",
                          color: "#fff",
                          width: { xs: "100%", sm: "auto" },
                          "&:hover": {
                            bgcolor: "#1565c0",
                          },
                        }}
                      >
                        + Add Section
                      </Button>
                    </Box>
                  )}
                />
                {/* Submit */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    fontWeight: "bold",
                    bgcolor: "green",
                    color: "#fff",
                    width: { xs: "100%", sm: "40%", md: "20%" },
                    "&:hover": {
                      bgcolor: "#388e3c",
                    },
                  }}
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Submit
                </Button>
              </form>
            </FormikProvider>
          </Paper>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1200}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Blog Added Successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddBlog;
