import { Document, Schema, model } from "mongoose";

export interface CommentInterface extends Document {
  text: String;
  userId: String;
  postId: String;
}

export const commentSchema = new Schema({
  text: String,
  userId: String,
  postId: String
});

const Comment = model<CommentInterface>("Comment", commentSchema);
export default Comment;
