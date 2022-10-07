import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});

export const GET_ALL_TODOS = gql`
query GetTodos {
    todos {
        id
        text
        checked
    }   
}
`;

export const SET_TODO_CHECKED = gql`
        mutation SetTodoChecked(
          $id: String!
          $checked: Boolean!
        ) {
          setTodoChecked(id: $id, checked: $checked) {
          id
          checked
        }
      }
`;

export const ADD_TODO = gql`
        mutation AddTodo(
          $text: String!
        ) {
          addTodo(text: $text) {
            id
            text
            checked
          }
        }
`;

export const DELETE_TODO = gql`
mutation DeleteTodo (
  $id: String!
) {
  deleteTodo(id: $id) {
    id
    text
    checked
  }
}
`;

export const SET_TODO_TEXT = gql`
mutation SetTodoText (
  $id: String!
  $text: String!
) {
  setTodoText(id: $id, text: $text) {
    id
    text
  }
}
`;
