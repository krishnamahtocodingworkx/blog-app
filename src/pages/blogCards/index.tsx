import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/slices/blogSlice";
import CardsItem from "../../components/CardsItem";
import Navbar from "../../components/Navbar";
import Typography from "@mui/material/Typography";
// import Girl from "../../assets/images/Girl.jpg";
// import Cat from "../../assets/images/Cat.jpg";
// import Ocean from "../../assets/images/Ocean.jpg";
import Menu from "../../components/Menu";
import { Box } from "@mui/material";
import { authAPIServices } from "../../services/AxiosClient";

// const myBlogs = [
//   {
//     id: 1,
//     title: "Introduction to Framer Motion: Bring Your React UI to Life",
//     image: Girl,
//   },
//   {
//     id: 2,
//     title:
//       "Next.js is a powerful React framework that enables server-side rendering and static site generation.",
//     image: Cat,
//   },
//   {
//     id: 3,
//     title: "Understanding Next.js with TypeScript",
//     image: Ocean,
//   },
// ];

const BlogCards: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await authAPIServices.get("/api/blogs");
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
          mt: { xs: "56px", sm: "64px" },
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "rgba(239, 239, 239, 1)",
        }}
      >
        <Menu />
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
