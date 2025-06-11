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
        justifyContent: { xs: "center", sm: "flex-start" },
        alignItems: "stretch",
        mt: 4,
        width: "100%",
        p: { xs: 1, sm: 2 },
      }}
    >
      {blogs.length === 0 ? (
        <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No blogs to display.
          </Typography>
        </Box>
      ) : (
        blogs.map((blog) => (
          <Box
            key={blog.id}
            sx={{
              flex: {
                xs: "0 1 100%", // 1 per row on mobile
                sm: "0 1 48%", // 2 per row on tablet
                md: "0 1 31%", // 3 per row on desktop
              },
              maxWidth: {
                xs: "100%",
                sm: "48%",
                md: "31%",
              },
              mb: 3,
              display: "flex",
            }}
          >
            <Card
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                image={blog.coverImageUrl}
                alt={blog.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
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
          </Box>
        ))
      )}
    </Box>
  );
};

export default CardsItem;
