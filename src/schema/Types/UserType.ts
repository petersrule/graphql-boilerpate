import { Post } from "../../models";
import { PostType } from "./PostType";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from "graphql";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    },
    age: {
      type: GraphQLString
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent) {
        return Post.find({
          userId: parent.id
        });
      }
    }
  })
});
