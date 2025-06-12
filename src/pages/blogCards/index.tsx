import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/slices/blogSlice";
import CardsItem from "../../components/CardsItem";
import Navbar from "../../components/Navbar";
import Typography from "@mui/material/Typography";
import Menu from "../../components/Menu";
import { Box } from "@mui/material";
import { blogService } from "../../services/blog";

const BlogCards: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.fetchBlogs();
        console.log("Fetched blogs:", response.data);
        dispatch(setBlogs(response.data.result));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, [dispatch]);

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
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mt: "30px",
              mb: "30px",
            }}
          >
            Latest News
          </Typography>
          <CardsItem />
        </Box>
      </Box>
    </>
  );
};

export default BlogCards;
