import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DialogDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  blogTitle?: string;
}

const DialogDelete: React.FC<DialogDeleteProps> = ({
  open,
  onClose,
  onConfirm,
  blogTitle,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete Blog</DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to delete
        {blogTitle ? ` "${blogTitle}"` : " this blog"}?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogDelete;
