import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import { UserType, PostType } from "./Types";
import { Post, User } from "../models/";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: PostType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Post.findById(args.id);
      }
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    }
  }
});
