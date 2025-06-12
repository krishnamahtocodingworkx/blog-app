import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  sx?: object;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search any blog",
  sx = {},
}) => (
  <TextField
    size="small"
    variant="outlined"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    sx={{ width: { xs: "100%", sm: "200px" }, ...sx }}
  />
);

export default SearchBar;
