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
  const blogs = useSelector((state: RootState) => state.blog.blogs) || [];
  console.log("Redux blogs:", blogs);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: "flex-start",
        mt: 4,
      }}
    >
      {blogs.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No blogs to display.
        </Typography>
      ) : (
        blogs.map((blog) => {
          // console.log(blog.coverImageUrl);
          return (
            <Card
              key={blog.id}
              sx={{
                width: { xs: "100%", sm: "calc(33% - 32px)" },
                minWidth: 280,
                maxWidth: 390,
                flex: "1 1 calc(33% - 32px)",
                borderRadius: 3,
              }}
            >
              <CardMedia
                component="img"
                image={blog.coverImageUrl}
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
          );
        })
      )}
    </Box>
  );
};

export default CardsItem;
