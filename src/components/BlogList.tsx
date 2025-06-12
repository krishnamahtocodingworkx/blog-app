import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Toolbar, GlobalStyles } from "@mui/material";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateBlog } from "../redux/slices/blogSlice";
import Pagination from "./Pagination";
import PrevNextBtn from "./PrevNextBtn";
import DialogEdit from "./DialogEdit";
import DialogDelete from "./DialogDelete";
import SearchBar from "./SearchBar";
import FilterBlogs from "./FilterBlogs";
import BlogsTable from "./BlogsTable";
import { STRING } from "../utils/string";

const BlogList: React.FC = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedBlogs, setPaginatedBlogs] = useState<any[]>([]);

  // Search/filter state
  const [search, setSearch] = useState<string>("");
  const [filterMode, setFilterMode] = useState<boolean>(false);

  // Filtered blogs state
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);

  // Filtering/searching logic
  useEffect(() => {
    let filtered = blogs;
    if (search.trim()) {
      filtered = filtered.filter((blog: any) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredBlogs(filtered);
    setPage(0);
  }, [blogs, search]);

  // Pagination logic
  useEffect(() => {
    setPaginatedBlogs(
      filteredBlogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [filteredBlogs, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredBlogs.length / rowsPerPage) || 1;

  // Edit dialog state
  const [editOpen, setEditOpen] = React.useState(false);
  const [editBlog, setEditBlog] = React.useState<any>(null);
  const [editTitle, setEditTitle] = React.useState("");
  const [editDate, setEditDate] = React.useState("");

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteBlog, setDeleteBlog] = React.useState<any>(null);

  // Actions
  const handleEdit = (blog: any) => {
    setEditBlog(blog);
    setEditTitle(blog.title);
    setEditDate(blog.createdAt ? blog.createdAt.slice(0, 10) : "");
    setEditOpen(true);
  };

  const handleDeleteClick = (blog: any) => {
    setDeleteBlog(blog);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteBlog) {
      dispatch(deleteBlog(deleteBlog.id));
    }
    setDeleteOpen(false);
    setDeleteBlog(null);
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

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteBlog(null);
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
        {/* menu start */}
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
        {/* menu end */}
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
                {STRING.blogListHeading}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  alignItems: { xs: "stretch", sm: "center" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <SearchBar
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                  placeholder={
                    filterMode ? "Filter keyword" : "Search any blog"
                  }
                />
                <FilterBlogs
                  filterMode={filterMode}
                  setFilterMode={setFilterMode}
                />
              </Box>
            </Toolbar>

            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <BlogsTable
                filteredBlogs={paginatedBlogs}
                page={page}
                rowsPerPage={rowsPerPage}
                handleEdit={handleEdit}
                handleDeleteClick={handleDeleteClick}
              />
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
            <Pagination
              count={blogs.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(_event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
            <PrevNextBtn
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </Box>
        </Box>
      </Box>
      <DialogEdit
        open={editOpen}
        editTitle={editTitle}
        editDate={editDate}
        setEditTitle={setEditTitle}
        setEditDate={setEditDate}
        onClose={handleEditClose}
        onSave={handleEditSave}
      />
      <DialogDelete
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        blogTitle={deleteBlog?.title}
      />
    </>
  );
};

export default BlogList;
