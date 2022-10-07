import {
  Checkbox,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_TODO, GET_ALL_TODOS, SET_TODO_CHECKED } from "../../api/apollo";
import { Todo } from "../../data/Todo";
import { EditTodo } from "./EditTodo";
import { useState } from "react";

export const TodoList = () => {
  const [editId, setEditId] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const { loading, error, data } = useQuery(GET_ALL_TODOS);

  const [setTodoChecked] = useMutation(SET_TODO_CHECKED, {
    refetchQueries: ["GetTodos"],
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: ["GetTodos"],
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <EditTodo
        id={editId}
        text={editText}
        open={showEdit}
        onClose={() => setShowEdit(false)}
      />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Checked</TableCell>
              <TableCell>Text</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.todos.map((data: Todo) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox
                    checked={data.checked}
                    onChange={() => setTodoChecked({ variables: { id: data.id, checked: !data.checked } })}
                  />
                </TableCell>
                <TableCell>{data.text}</TableCell>
                <TableCell>
                  <IconButton
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => deleteTodo({ variables: { id: data.id } })}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => {
                      setEditText(data.text);
                      setEditId(data.id);
                      setShowEdit(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
