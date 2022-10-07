import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import Todo from "../models/Todo";
import { TodoType } from "./Todo";

export const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        todos: {
            type: GraphQLList(TodoType),
            description: 'List of todos',
            resolve: () => Todo.find().then(todos => todos)
        },
        todo: {
            type: TodoType,
            description: 'A single todo',
            args: {
                id: { type: GraphQLString }
            },
            resolve: (_parent, args) => Todo.findById(args.id)
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
            resolve: (_parent, args) =>
                Todo.insertMany([{ text: args.text, checked: false }]).then(todos => todos[0])
        },
        setTodoChecked: {
            type: TodoType,
            description: 'Toggle a todo',
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                checked: { type: GraphQLNonNull(GraphQLBoolean) }
            },
            resolve: (_parent, args) => Todo.findByIdAndUpdate({ _id: args.id }, { checked: args.checked })
        },
        deleteTodo: {
            type: TodoType,
            description: 'Delete a todo',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_parent, args) => Todo.findByIdAndDelete({ _id: args.id })
        },
        setTodoText: {
            type: TodoType,
            description: 'Set text on a todo',
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                text: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (_parent, args) => Todo.findByIdAndUpdate({ _id: args.id }, { text: args.text })
        }
    })
});