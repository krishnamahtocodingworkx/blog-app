import React, { useState, useEffect } from "react";
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
  GlobalStyles,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteBlog, updateBlog } from "../redux/slices/blogSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const BlogList: React.FC = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [paginatedBlogs, setPaginatedBlogs] = useState<any[]>([]);

  useEffect(() => {
    setPaginatedBlogs(
      blogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [blogs, page, rowsPerPage]);

  const totalPages = Math.ceil(blogs.length / rowsPerPage) || 1;

  // Edit dialog state
  const [editOpen, setEditOpen] = React.useState(false);
  const [editBlog, setEditBlog] = React.useState<any>(null);
  const [editTitle, setEditTitle] = React.useState("");
  const [editDate, setEditDate] = React.useState("");

  // Actions
  const handleEdit = (blog: any) => {
    setEditBlog(blog);
    setEditTitle(blog.title);
    setEditDate(blog.createdAt ? blog.createdAt.slice(0, 10) : "");
    setEditOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditBlog(null);
  };

  const handleEditSave = () => {
    if (editBlog) {
      dispatch(
        updateBlog({
          ...editBlog,
          title: editTitle,
          createdAt: editDate,
        })
      );
    }
    setEditOpen(false);
    setEditBlog(null);
  };

  return (
    <>
      <GlobalStyles
        styles={{
          ".MuiTablePagination-actions": { display: "none" },
        }}
      />
      <Navbar />
      <Box
        sx={{
          mt: { xs: "56px", sm: "64px" },
          display: "flex",
          minHeight: "100vh",
          flexDirection: { xs: "column", sm: "row" },
          bgcolor: "rgba(239, 239, 239, 1)",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            minHeight: "100%",
            position: "sticky",
            top: { xs: "56px", sm: "64px" },
          }}
        >
          <Menu />
        </Box>
        <Box
          sx={{
            flex: 1,
            p: { xs: 1, sm: 3 },
            width: "100%",
            minWidth: 0,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1, sm: 2 },
              border: "none",
              boxShadow: "none",
              bgcolor: "#fff",
            }}
          >
            <Toolbar
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                justifyContent: "space-between",
                mb: 2,
                gap: { xs: 2, sm: 0 },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: { xs: 1, sm: 0 } }}
              >
                Blog List
              </Typography>
              {/* Filter UI only, no logic */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  alignItems: { xs: "stretch", sm: "center" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Search any blog"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: { xs: "100%", sm: "200px" } }}
                  disabled
                />
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                  disabled
                >
                  Filter
                </Button>
              </Box>
            </Toolbar>
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <TableContainer>
                <Table sx={{ minWidth: 600 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "rgba(240, 242, 246, 1)" }}>
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
                      paginatedBlogs.map((blog: any, idx: number) => (
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
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "space-between",
              mt: 2,
              gap: { xs: 2, sm: 0 },
              px: 2,
              pb: 2,
            }}
          >
            <TablePagination
              component="div"
              count={blogs.length}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 9, 10, 25]}
              labelRowsPerPage="Rows per page"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                Previous
              </Button>
              <Typography variant="body2" sx={{ alignSelf: "center" }}>
                Page {page + 1} of {totalPages}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Blog Title"
            type="text"
            fullWidth
            variant="outlined"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Created Date"
            type="date"
            fullWidth
            variant="outlined"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogList;
