import { ApolloProvider } from "@apollo/client";
import { client } from "./api/apollo";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { NewTodo } from "./components/navbar/NewTodo";
import { TodoList } from "./components/navbar/TodoList";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Navbar />
        <NewTodo />
        <TodoList />
      </ApolloProvider>
    </div>
  );
}

export default App;
