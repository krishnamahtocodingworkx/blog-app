import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const CardsItem: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: "center",
        mt: 4,
      }}
    >
      {blogs.map((blog) => (
        <Card key={blog.id} sx={{ width: 390, borderRadius: 3, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="170"
            image={blog.image}
            alt={blog.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: 600, mb: 2, textAlign: "left" }}
            >
              {blog.title}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                color: "#fff",
                borderRadius: "10px",
                width: "50%",
                mt: 1,
                fontWeight: 500,
              }}
            >
              Read More
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CardsItem;
