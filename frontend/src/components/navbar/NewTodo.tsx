import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TODO } from "../../api/apollo";

export const NewTodo = () => {
  const [addTodo] = useMutation(ADD_TODO, { refetchQueries: ["GetTodos"] });

  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setText("");
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
          <Add />
        </Fab>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Text"
            type="text"
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (text.length > 0) {
                addTodo({ variables: { text: text } });
                handleClose();
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
