import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  password: string;
  email: string;
  token?: string;
  confirmed?: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  token: String,
  confirmed: { type: Boolean, default: false },
}, {
  timestamps: true
}
);

const User = model<IUser>('User', userSchema);
export default User