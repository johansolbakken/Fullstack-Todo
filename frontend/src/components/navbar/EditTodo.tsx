import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SET_TODO_TEXT } from "../../api/apollo";

interface EditTodoProps {
  id: string;
  text: string;
  open: boolean;
  onClose: () => void;
}

export const EditTodo = (props: EditTodoProps) => {
  const [editText, setEditText] = useState<string>(props.text);

  useEffect(() => {
    setEditText(props.text);
  }, [props.text]);

  const [setTodoText] = useMutation(SET_TODO_TEXT, {
    refetchQueries: ["GetTodos"],
  });

  return (
    <Dialog open={props.open}>
      <DialogTitle>Edit todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="text"
          label="Edit text"
          type="text"
          fullWidth
          variant="outlined"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (editText.length > 0) {
              setTodoText({ variables: { id: props.id, text: editText } });
              props.onClose();
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
