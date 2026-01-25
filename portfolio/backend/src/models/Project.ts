/**
 * Project Model
 * Mongoose schema for projects
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  year: string;
  services: string;
  description: string;
  image: string;
  live: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Title is required'],
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title must be at most 100 characters']
    },
    slug: { 
      type: String, 
      required: [true, 'Slug is required'], 
      unique: true,
      lowercase: true,
      trim: true
    },
    year: { 
      type: String, 
      required: [true, 'Year is required'],
      match: [/^\d{4}(\/\d{2})?$/, 'Year must be in format YYYY or YYYY/YY']
    },
    services: { 
      type: String, 
      required: [true, 'Services are required']
    },
    description: { 
      type: String, 
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1000, 'Description must be at most 1000 characters']
    },
    image: { type: String, default: '' },
    live: { type: String, default: '#' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
