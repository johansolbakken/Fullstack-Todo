import express from "express";
import { graphqlHTTP, Options } from "express-graphql";
import { GraphQLSchema } from "graphql";
import { RootMutationType, RootQueryType } from "./services";
var cors = require('cors');

const app = express();
app.use(cors());

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
} as Options));

const port = 5001;
app.listen(port, () => console.log('Server is running.'));



