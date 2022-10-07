import { config } from "dotenv";
import express from "express";
import { graphqlHTTP, Options } from "express-graphql";
import { GraphQLSchema } from "graphql";
import mongoose from "mongoose";
import { RootMutationType, RootQueryType } from "./services";
var cors = require('cors');

config();

const app = express();

mongoose.connect(String(process.env.MONGO_URI)).then(() => {
    console.log('DB Connected');
})
.catch(err => {
    console.log("DB connection error", err);
});


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



