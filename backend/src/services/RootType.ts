import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { todos } from "../data";
import { deleteTodo, Todo } from "../data/Todos";
import { TodoType } from "./Todo";

export const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        todos: {
            type: GraphQLList(TodoType),
            description: 'List of todos',
            resolve: () => todos
        },
        todo: {
            type: TodoType,
            description: 'A single todo',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (_parent, args) => todos.find(todo => todo.id === args.id)
        }
    })
});

export const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation',
    fields: () => ({
        addTodo: {
            type: TodoType,
            description: 'Add new todo',
            args: {
                text: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (_parent, args) => {
                const todo: Todo = {
                    id: todos.length + 1,
                    text: args.text,
                    checked: false
                }
                todos.push(todo);
                return todo;
            }
        },
        toggleTodo: {
            type: TodoType,
            description: 'Toggle a todo',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_parent, args) => {
                const todo = todos.find(todo => todo.id === args.id);
                if (todo !== undefined) {
                    todo.checked = !todo.checked;
                }
                return todo;
            }
        },
        deleteTodo: {
            type: TodoType,
            description: 'Delete a todo',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_parent, args) => deleteTodo(args.id)
        },
        setTodoText: {
            type: TodoType,
            description: 'Set text on a todo',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                text: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (_parent, args) => {
                const id = todos.findIndex(todo => todo.id === args.id);
                todos[id].text = args.text;
                return todos[id];
            }
        }
    })
});