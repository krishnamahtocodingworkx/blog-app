import React from "react";
import { Box, Skeleton } from "@mui/material";

const Shimmer: React.FC = () => (
  <Box sx={{ width: "100%", p: 2 }}>
    <Skeleton variant="rectangular" height={180} sx={{ mb: 2 }} />
    <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
    <Skeleton variant="text" width="40%" />
    <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
  </Box>
);

export default Shimmer;
