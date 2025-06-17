import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Toolbar, GlobalStyles } from "@mui/material";
import Navbar from "./Navbar";
import Menu from "./Menu";
import Pagination from "./Pagination";
import PrevNextBtn from "./PrevNextBtn";
import DialogEdit from "./DialogEdit";
import DialogDelete from "./DialogDelete";
import SearchBar from "./SearchBar";
import FilterBlogs from "./FilterBlogs";
import BlogsTable from "./BlogsTable";
import { STRING } from "../utils/string";
import { blogService } from "../services/blog";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../utils/endPoints";
export type PaginationType = {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
};
const BlogList: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 5,
    totalPages: 0,
    total: 0,
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [totalCount] = useState(0);

  // Blogs state
  const [blogs, setBlogs] = useState<any[]>([]);

  // Search/filter state
  const [search, setSearch] = useState<string>("");
  const [filterMode, setFilterMode] = useState<boolean>(false);

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState<any>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogService.fetchBlogs({
          page: pagination.page,
          limit: pagination.limit,
        });
        console.log("response :", res.data);
        setBlogs(res.data.result || []);
        setPagination({
          page: res.data.pagination.page,
          limit: res.data.pagination.limit,
          totalPages: res.data.pagination.totalPages,
          total: res.data.pagination.total,
        });
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
        setPagination({
          page: 1,
          limit: 5,
          totalPages: 0,
          total: 0,
        });
      }
    };

    fetchBlogs();
  }, [pagination.page, pagination.limit]);

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    navigate(`${ENDPOINTS.BLOGS}?page=${newPage + 1}&limit=${rowsPerPage}`);
  };
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    navigate(`${ENDPOINTS.BLOGS}?page=1&limit=${newLimit}`);
  };

  // Search logic
  const handleSearch = (value: string) => {
    setSearch(value);
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog: any) =>
        blog.title?.toLowerCase().includes(value.toLowerCase())
      )
    );
    setPage(0);
  };

  // Filter logic
  const handleFilter = (value: string) => {
    setSearch(value);
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog: any) =>
        blog.title?.toLowerCase().includes(value.toLowerCase())
      )
    );
    setPage(0);
  };

  // Edit/Delete actions
  const handleEdit = (blog: any) => {
    setEditBlog(blog);
    setEditTitle(blog.title);
    setEditDate(blog.createdAt ? blog.createdAt.slice(0, 10) : "");
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setEditBlog(null);
  };
  const handleEditSave = () => {
    if (!editBlog) return;
    setBlogs((prevBlogs) => {
      const idx = prevBlogs.findIndex((blog) => blog.id === editBlog.id);
      if (idx === -1) return prevBlogs;
      const updatedBlog = {
        ...prevBlogs[idx],
        title: editTitle,
        createdAt: editDate,
      };
      const newBlogs = [...prevBlogs];
      newBlogs[idx] = updatedBlog;
      return newBlogs;
    });
    setEditOpen(false);
    setEditBlog(null);
  };
  const handleDeleteClick = (blog: any) => {
    setDeleteBlog(blog);
    setDeleteOpen(true);
  };
  const handleDeleteConfirm = () => {
    if (!deleteBlog) return;
    console.log("Deleting blog with id:", deleteBlog.id);
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => {
        console.log("Comparing", blog.id, "with", deleteBlog.id);
        return blog.id !== deleteBlog.id;
      })
    );
    setDeleteOpen(false);
    setDeleteBlog(null);
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
                    filterMode
                      ? handleFilter(e.target.value)
                      : handleSearch(e.target.value)
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
                filteredBlogs={blogs}
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
              count={totalCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(_event, newPage) => handlePageChange(newPage)}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
            <PrevNextBtn
              page={pagination.page}
              setPagination={setPagination}
              totalPages={pagination.totalPages}
            />
          </Box>
        </Box>
      </Box>
      <DialogEdit
        open={editOpen}
        editBlog={editBlog}
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
