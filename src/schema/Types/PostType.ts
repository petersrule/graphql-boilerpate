import { Comment } from "./../../models";
import { User } from "../../models";
import { CommentType } from "./CommentType";
import { UserType } from "./UserType";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    body: {
      type: GraphQLString
    },
    isPublished: {
      type: GraphQLBoolean
    },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent) {
        return Comment.find({
          postId: parent.id
        });
      }
    }
  })
});
