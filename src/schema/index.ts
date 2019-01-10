import { Mutation } from "./Mutation";
import { RootQuery } from "./RootQuery";
import { GraphQLSchema } from "graphql";

export = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
