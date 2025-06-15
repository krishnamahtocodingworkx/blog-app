import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/slices/blogSlice";
import CardsItem from "../../components/CardsItem";
import Navbar from "../../components/Navbar";
import Typography from "@mui/material/Typography";
import Menu from "../../components/Menu";
import { Box, Button, Stack } from "@mui/material";
import { blogPageService } from "../../services/blogPage";
// import { blogService } from "../../services/blog";
import { useNavigate, useLocation } from "react-router-dom";
import { ENDPOINTS } from "../../utils/endPoints";

const BlogCards: React.FC = () => {
  const dispatch = useDispatch();
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogPageService.fetchBlogs(page);
        // const response = await blogService.fetchBlogs(`?page=${page}`);
        setTotalPages(response.data.totalPages);
        dispatch(setBlogs(response.data.result));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, [dispatch, page]);

  const handleNext = async () => {
    if (page < totalPages) {
      navigate(`${ENDPOINTS.BLOGS}?page=${page + 1}`);
      // const nextPage = page + 1;
      // try {
      //   const response = await blogService.fetchBlogs(`?page=${nextPage}`);
      //   setTotalPages(response.data.totalPages);
      //   dispatch(setBlogs(response.data.result));
      //   setPage(nextPage);
      // } catch (error) {
      //   console.error("Failed to fetch blogs:", error);
      // }
    }
  };

  const handlePrev = async () => {
    if (page > 1) {
      navigate(`${ENDPOINTS.BLOGS}?page=${page - 1}`);
      // const prevPage = page - 1;
      // try {
      //   const response = await blogService.fetchBlogs(`?page=${prevPage}`);
      //   setTotalPages(response.data.totalPages);
      //   dispatch(setBlogs(response.data.result));
      //   setPage(prevPage);
      // } catch (error) {
      //   console.error("Failed to fetch blogs:", error);
      // }
    }
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
              disabled={page === totalPages}
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
          <CardsItem />
        </Box>
      </Box>
    </>
  );
};

export default BlogCards;
