import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/slices/blogSlice";
import CardsItem from "../../components/CardsItem";
import Navbar from "../../components/Navbar";
import Typography from "@mui/material/Typography";
import Menu from "../../components/Menu";
import { Box, Button, Stack } from "@mui/material";
import { blogService } from "../../services/blog";

const BlogCards: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [blogs, setLocalBlogs] = useState([]);

  // Fetch blogs whenever page changes
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.fetchBlogs({ page });
        setLocalBlogs(response.data.result);
        dispatch(setBlogs(response.data.result));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, [page, dispatch]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          bgcolor: "rgba(239, 239, 239, 1)",
          mt: { xs: "56px", sm: "64px" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          minHeight: "100vh",
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
        <Box sx={{ flex: 1, px: 3 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mt: "30px",
              mb: "10px",
            }}
          >
            Latest News
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              onClick={handlePrev}
              disabled={page === 1}
              sx={{
                textTransform: "none",
                "&:hover": {
                  color: "primary.main",
                  borderColor: "primary.main",
                },
              }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              onClick={handleNext}
              sx={{
                textTransform: "none",
                "&:hover": {
                  color: "primary.main",
                  borderColor: "primary.main",
                },
              }}
            >
              Next
            </Button>
          </Stack>
          <CardsItem blogs={blogs} />
        </Box>
      </Box>
    </>
  );
};

export default BlogCards;
