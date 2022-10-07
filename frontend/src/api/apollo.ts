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

export const TOGGLE_TODO = gql`
        mutation ToggleTodo(
          $id: Int!
        ) {
        toggleTodo(id: $id) {
          id
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
  $id: Int!
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
  $id: Int!
  $text: String!
) {
  setTodoText(id: $id, text: $text) {
    id
    text
    checked
  }
}
`;
