import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteBlog } from "../redux/slices/blogSlice";

const BlogList: React.FC = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  // Table state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Search/filter state
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");

  // Handle search and filter (both on blog title)
  const filteredBlogs = useMemo(() => {
    let filtered = blogs || [];
    if (search.trim()) {
      filtered = filtered.filter((blog: any) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (appliedFilter.trim()) {
      filtered = filtered.filter((blog: any) =>
        blog.title.toLowerCase().includes(appliedFilter.toLowerCase())
      );
    }
    return filtered;
  }, [blogs, search, appliedFilter]);

  // Pagination
  const paginatedBlogs = useMemo(
    () =>
      filteredBlogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredBlogs, page, rowsPerPage]
  );

  // Actions
  const handleEdit = (blog: any) => {
    alert(`Edit blog: ${blog.title}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  // Table handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter handlers
  const handleApplyFilter = () => {
    setAppliedFilter(filterValue);
    setFilterOpen(false);
    setPage(0);
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setAppliedFilter("");
    setFilterOpen(false);
    setPage(0);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Menu />
        <Box sx={{ flex: 1, p: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Toolbar sx={{ justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Blog List
              </Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Search any blog"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => setFilterOpen((open) => !open)}
                >
                  Filter
                </Button>
                {filterOpen && (
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="Filter by title…"
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleApplyFilter}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClearFilter}
                    >
                      Clear
                    </Button>
                  </Box>
                )}
                {appliedFilter && !filterOpen && (
                  <Typography variant="body2" color="primary">
                    Filter: {appliedFilter}
                  </Typography>
                )}
              </Box>
            </Toolbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Blog Title</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedBlogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No blogs found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedBlogs.map((blog: any, idx: number) => {
                      return (
                        <TableRow key={blog.id}>
                          <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                          <TableCell>{blog.title}</TableCell>
                          <TableCell>
                            {blog.createdAt
                              ? new Date(blog.createdAt).toLocaleDateString()
                              : "-"}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleEdit(blog)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(blog.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <TablePagination
                component="div"
                count={filteredBlogs.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage="Rows per page"
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setPage((p) =>
                      p < Math.ceil(filteredBlogs.length / rowsPerPage) - 1
                        ? p + 1
                        : p
                    )
                  }
                  disabled={
                    page >= Math.ceil(filteredBlogs.length / rowsPerPage) - 1
                  }
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default BlogList;
