import { Document, Schema, model } from "mongoose";

export interface PostInterface extends Document {
  title: String;
  body: String;
  isPublished: Boolean;
  userId: String;
  commentsId: [String];
}

export const postSchema = new Schema({
  title: String,
  body: String,
  isPublished: Boolean,
  userId: String,
  commentsId: [String]
});

const Post = model<PostInterface>("Post", postSchema);
export default Post;
