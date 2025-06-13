import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface PrevNextBtnProps {
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  totalPages: number;
}

const PrevNextBtn: React.FC<PrevNextBtnProps> = ({
  page,
  setPage,
  totalPages,
}) => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
    <Button
      variant="outlined"
      onClick={() => setPage((p: number) => Math.max(0, p - 1))}
      // disabled={page === 0}
    >
      Previous
    </Button>
    <Typography variant="body2" sx={{ alignSelf: "center" }}>
      Page {page + 1} of {totalPages}
    </Typography>
    <Button
      variant="outlined"
      onClick={() => setPage((p: number) => Math.min(totalPages - 1, p + 1))}
      // disabled={page >= totalPages - 1}
    >
      Next
    </Button>
  </Box>
);

export default PrevNextBtn;
