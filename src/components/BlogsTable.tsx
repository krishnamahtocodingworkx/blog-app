import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface BlogsTableProps {
  filteredBlogs: any[];
  page: number;
  rowsPerPage: number;
  handleEdit: (blog: any) => void;
  handleDeleteClick: (blog: any) => void;
}

const BlogsTable: React.FC<BlogsTableProps> = ({
  filteredBlogs,
  page,
  rowsPerPage,
  handleEdit,
  handleDeleteClick,
}) => (
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
        {filteredBlogs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} align="center">
              No blogs found.
            </TableCell>
          </TableRow>
        ) : (
          filteredBlogs.map((blog: any, idx: number) => (
            <TableRow key={blog.id}>
              <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(blog)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteClick(blog)}
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
);

export default BlogsTable;
