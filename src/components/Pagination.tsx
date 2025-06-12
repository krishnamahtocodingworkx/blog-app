import React from "react";
import { TablePagination } from "@mui/material";

interface PaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions?: number[];
  labelRowsPerPage?: string;
  sx?: object;
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 15],
  labelRowsPerPage = "Rows per page",
  sx = {},
}) => (
  <TablePagination
    component="div"
    count={count}
    page={page}
    onPageChange={onPageChange}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={onRowsPerPageChange}
    rowsPerPageOptions={rowsPerPageOptions}
    labelRowsPerPage={labelRowsPerPage}
    sx={sx}
  />
);

export default Pagination;
