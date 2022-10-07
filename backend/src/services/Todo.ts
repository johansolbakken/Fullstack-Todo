import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const TodoType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Todo',
    description: 'Represents a todo',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLNonNull(GraphQLString) },
        checked: { type: GraphQLBoolean }
    })
});
