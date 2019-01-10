import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} from "graphql";
import { UserType, PostType, CommentType } from "./Types";
import { User, Post, Comment } from "../models";
import { resolve } from "url";

const Message = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    message: {
      type: GraphQLString
    }
  })
});

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parent, args) {
        // let hashedPassword = {};
        let user = new User({
          name: args.name,
          email: args.email,
          age: args.age
        });
        if (!user.name || !user.email || !user.age)
          throw new Error(
            "Information submitted was incomplete. Todo was not created"
          );
        return new Promise((resolve, reject) => {
          user
            .save()
            .then((result: any) => {
              return resolve(result); // if no errors on the "findOneAndUpdate", return the result
            })
            .catch((err: any) => {
              return reject(err); // reject if there is an err
            });
        });
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        }
      },
      resolve(parent, args) {
        if (!args.id) throw new Error("User id not provided");
        return new Promise((resolve, reject) => {
          if (args.name) {
            User.findByIdAndUpdate(
              {
                _id: args.id
              },
              {
                $set: {
                  name: args.name // make the change
                }
              },
              {
                new: true // This makes sure the return result is the updated information
                // museFindAndModify: false // Prevents error in console. DOESN'T WORK IN TS
              }
            );
          }

          if (args.email) {
            User.findByIdAndUpdate(
              {
                _id: args.id
              },
              {
                $set: {
                  email: args.email // make the change
                }
              },
              {
                new: true // This makes sure the return result is the updated information
                // museFindAndModify: false // Prevents error in console. DOESN'T WORK IN TS
              }
            );
          }

          if (args.age) {
            User.findByIdAndUpdate(
              {
                _id: args.id
              },
              {
                $set: {
                  age: args.age // make the change
                }
              },
              {
                new: true // This makes sure the return result is the updated information
                // museFindAndModify: false // Prevents error in console. DOESN'T WORK IN TS
              }
            );
          }

          if (!args.name && !args.email && !args.age)
            throw new Error("No change specified");
          return User.findById(args.id);
        });
      }
    },
    deleteUser: {
      type: Message,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        if (!args.id)
          throw new Error(
            "Please provide a valid id for the User to be removed"
          );
        return new Promise((resolve, reject) => {
          User.deleteOne({
            _id: args.id
          })
            .then(() =>
              resolve({
                message: "User removed"
              })
            )
            .catch((err: any) => reject(err));
        });
      }
    },
    createPost: {
      type: PostType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        },
        body: {
          type: new GraphQLNonNull(GraphQLString)
        },
        userId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        let post = new Post({
          title: args.title,
          body: args.body,
          isPublished: false,
          userId: args.userId,
          commentsId: []
        });
        if (!post.title || !post.body || !post.userId)
          throw new Error(
            "Information submitted was incomplete. Todo was not created"
          );
        return new Promise((resolve, reject) => {
          post
            .save()
            .then((result: any) => {
              return resolve(result); // if no errors on the "findOneAndUpdate", return the result
            })
            .catch((err: any) => {
              return reject(err); // reject if there is an err
            });
        });
      }
    },
    updatePost: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        title: {
          type: GraphQLString
        },
        body: {
          type: GraphQLString
        },
        isPublished: {
          type: GraphQLBoolean
        }
      },
      resolve(parent, args) {
        if (!args.id) throw new Error("User id not provided");
        return new Promise((resolve, reject) => {
          if (args.title) {
            User.findByIdAndUpdate(
              {
                _id: args.id
              },
              {
                $set: {
                  title: args.title // make the change
                }
              },
              {
                new: true // This makes sure the return result is the updated information
                // museFindAndModify: false // Prevents error in console. DOESN'T WORK IN TS
              }
            );
          }

          if (args.body) {
            User.findByIdAndUpdate(
              {
                _id: args.id
              },
              {
                $set: {
                  body: args.body // make the change
                }
              },
              {
                new: true // This makes sure the return result is the updated information
                // museFindAndModify: false // Prevents error in console. DOESN'T WORK IN TS
              }
            );
          }

          if (args.isPublished) {
            User.findByIdAndUpdate(
              {
                _id: args.id
              },
              {
                $set: {
                  isPublished: args.isPublished // make the change
                }
              },
              {
                new: true // This makes sure the return result is the updated information
                // museFindAndModify: false // Prevents error in console. DOESN'T WORK IN TS
              }
            );
          }

          if (!args.title && !args.body && !args.isPublished)
            throw new Error("No change specified");
          return User.findById(args.id);
        });
      }
    },
    deletePost: {
      type: Message,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        if (!args.id) throw new Error("Please provide a valid id");
        return new Promise((resolve, reject) => {
          Post.deleteOne({
            _id: args.id
          })
            .then(() =>
              resolve({
                message: "Post deleted"
              })
            )
            .catch((err: any) => reject(err));
        });
      }
    },
    createComment: {
      type: CommentType,
      args: {
        text: {
          type: new GraphQLNonNull(GraphQLString)
        },
        userId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        postId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        const comment = new Comment({
          text: args.text,
          userId: args.userId,
          postId: args.postId
        });
        if (!comment.text || !comment.userId || !comment.postId)
          throw new Error(
            "Information submitted was incomplete. Todo was not created"
          );
        return new Promise((resolve, reject) => {
          comment
            .save()
            .then((result: any) => {
              resolve(result);
            })
            .catch((err: any) => {
              reject(err);
            });
        });
      }
    },
    updateComment: {
      type: CommentType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        text: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        // Make sure the args are sent
        if (!args.id || !args.text)
          throw new Error("Please send the id and new text");
        // Find the Todo and update it
        Comment.findByIdAndUpdate(
          {
            _id: args.id
          },
          {
            $set: {
              text: args.text // make the change
            }
          },
          {
            new: true // This makes sure the return result is the updated information
            // museFindAndModify: false // Prevents error in console. DOESN'T WORK IN TS
          }
        );
      }
    }
  }
});
