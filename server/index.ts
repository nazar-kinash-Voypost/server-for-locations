import express, { Application, Request, Response } from "express";
import cors from "cors";
import depthLimit from "graphql-depth-limit";
import { ApolloServer } from "apollo-server-express";
import { MongoClient } from "mongodb";
import { Connection } from "mongoose";
const schema = require("./src/schema");

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    const connection: MongoClient | PromiseLike<MongoClient> = await MongoClient.connect(
      "mongodb+srv://nazar:LYmmeDgabUQVMaMJ@cluster0.09lof.mongodb.net/voypost"
    );
    const databace = connection.db("voypost");
    const collection = databace.collection("trips");

    const app: Application = express();

    const server: ApolloServer = new ApolloServer({
      schema,
      validationRules: [depthLimit(10)], // выставляем правило deph limit = 10
      playground: true,
    });

    app.use("*", cors());
    app.get("/", (req: Request, res: Response) => res.send("GraphQL API"));

    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () => console.log(`🚀 Server ready on port: ${PORT}`));
  } catch (err) {
    console.log(`❌  Something went wrong: \n ${err}`);
  }
};

startServer();
