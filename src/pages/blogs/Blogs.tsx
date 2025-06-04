import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/slices/blogSlice";
import CardsItem from "../../components/CardsItem";
import Navbar from "../../components/Navbar";
import Typography from "@mui/material/Typography";
import Girl from "../../assets/images/Girl.jpg";
import Cat from "../../assets/images/Cat.jpg";
import Ocean from "../../assets/images/Ocean.jpg";

const myBlogs = [
  {
    id: "1",
    title: "Introduction to Framer Motion: Bring Your React UI to Life",
    image: Girl,
  },
  {
    id: "2",
    title:
      "Next.js is a powerful React framework that enables server-side rendering and static site generation.",
    image: Cat,
  },
  {
    id: "3",
    title: "Understanding Next.js with TypeScript",
    image: Ocean,
  },
];

const Blogs: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBlogs(myBlogs));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mt: "5%",
          mb: "5%",
        }}
      >
        Latest News
      </Typography>
      <CardsItem />
    </>
  );
};

export default Blogs;
