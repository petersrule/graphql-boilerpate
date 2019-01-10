import { Document, Schema, model } from "mongoose";

export interface UserInterface extends Document {
  _id: String;
  name: String;
  email: String;
  age: String;
}

export const userSchema = new Schema({
  name: String,
  email: String,
  age: Number
});

const User = model<UserInterface>("User", userSchema);
export default User;
