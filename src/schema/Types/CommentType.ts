import { Post } from "./../../models";
import { User } from "../../models";
import { UserType } from "./UserType";
import { PostType } from "./PostType";
import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

export const CommentType: GraphQLObjectType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    text: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      }
    },
    post: {
      type: PostType,
      resolve(parent) {
        return Post.findById(parent.postId);
      }
    }
  })
});
