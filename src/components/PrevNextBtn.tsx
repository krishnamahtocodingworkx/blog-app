import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { PaginationType } from "./BlogList";

interface PrevNextBtnProps {
  page: number;
  setPagination: any;
  totalPages: number;
}

const PrevNextBtn: React.FC<PrevNextBtnProps> = ({
  page,
  setPagination,
  totalPages,
}) => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
    <Button
      variant="outlined"
      onClick={() =>
        setPagination((prev: PaginationType) => ({ ...prev, page: page - 1 }))
      }
      disabled={page === 1}
    >
      Previous
    </Button>
    <Typography variant="body2" sx={{ alignSelf: "center" }}>
      Page {page} of {totalPages}
    </Typography>
    <Button
      variant="outlined"
      onClick={() =>
        setPagination((prev: PaginationType) => ({ ...prev, page: page + 1 }))
      }
      disabled={page === totalPages}
    >
      Next
    </Button>
  </Box>
);

export default PrevNextBtn;
