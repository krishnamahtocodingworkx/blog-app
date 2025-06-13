import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface DialogEditProps {
  open: boolean;
  editBlog: any;
  editTitle: string;
  editDate: string;
  setEditTitle: (value: string) => void;
  setEditDate: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const DialogEdit: React.FC<DialogEditProps> = ({
  open,
  editTitle,
  editDate,
  setEditTitle,
  setEditDate,
  onClose,
  onSave,
}) => (
  <Dialog open={open} onClose={onClose}>
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
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onSave} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogEdit;
