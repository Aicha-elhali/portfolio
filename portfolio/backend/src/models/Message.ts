/**
 * Message Model
 * Mongoose schema for contact form messages
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must be at most 100 characters']
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    message: { 
      type: String, 
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [5000, 'Message must be at most 5000 characters']
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>('Message', MessageSchema);
