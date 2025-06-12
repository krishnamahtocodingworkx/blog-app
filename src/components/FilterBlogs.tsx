import React from "react";
import { Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface FilterBlogsProps {
  setFilterMode: React.Dispatch<React.SetStateAction<boolean>>;
  filterMode: boolean;
  sx?: object;
}

const FilterBlogs: React.FC<FilterBlogsProps> = ({
  filterMode,
  setFilterMode,
  sx = {},
}) => (
  <Button
    variant={filterMode ? "contained" : "outlined"}
    startIcon={<FilterListIcon />}
    sx={{ width: { xs: "100%", sm: "auto" }, ...sx }}
    onClick={() => setFilterMode((prev) => !prev)}
  >
    {filterMode ? "Filter On" : "Filter"}
  </Button>
);

export default FilterBlogs;
